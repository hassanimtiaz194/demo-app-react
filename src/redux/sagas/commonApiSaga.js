import {
  call,
  all,
  select,
  put,
  takeLatest,
  takeEvery,
  take,
  fork,
} from "redux-saga/effects";

import request, { requestWithProgress } from "utils/request";
import { UI_DESIGN_INFO_ENDPOINT, UPLOAD_FILE_ENDPOINT, REMOVE_UPLOADED_FILE_ENDPOINT, JUDGES_COMMENTS_ENDPOINT, UPLOAD_CONTESTANT_PHOTO_ENDPOINT, SUBMISSION_ENTRY_ENDPOINT, TRANSCODER_JOB_STATUS_ENDPOINT } from "./endpoints";

import { LOAD_UI_INFO, UPLOAD_FILE, REMOVE_UPLOADED_FILE, JUDGES_COMMENTS, UPLOAD_CONTESTANT_PHOTO, TRANSCODER_JOB_STATUS } from "redux/actions/types";

import {
  commonApiActions,
  contestantFormActions,
  globalActions,
  contestantFormTemplateActions,
  authActions,
  profileActions
} from "redux/actions";

import {
  initAppSelectors,
  authSelectors,
  contestantFormTemplateSelectors,
  dashboardSelectors,
} from "redux/selectors";
import { eventChannel } from "redux-saga";

function createOnTypingChannel() {
  let emit;
  /**
   *
   * @param {Object} event - Event came from XHR request
   */
  const onProgress = (event) => {
    emit(Math.round((event.loaded / event.total) * 100));
  };

  return {
    onProgress,
    channel: eventChannel((_emit) => {
      emit = _emit;
      // the subscriber must return an unsubscribe function
      // this will be invoked when the saga calls `channel.close` method
      const unsubscribe = () => { };

      return unsubscribe;
    }),
  };
}

function* getGetUiDesignInfo() {
  const level1Token = yield select(initAppSelectors.makeSelectInitAppToken());

  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${level1Token}`,
      "Content-Type": "application/json",
    }),
  };

  try {
    const res = yield call(request, UI_DESIGN_INFO_ENDPOINT, options);
    yield put(commonApiActions.uiInfoLoaded(res));
  } catch (error) {
    const err = yield error.response.json();
    console.log('Please check Design')
  }
}

function* uploadFile(action) {
  const token = yield select(authSelectors.makeSelectToken());

  const bracketId = yield select(
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId()
  );
  const phaseNumber = yield select(
    dashboardSelectors.makeSelectCurrentPhaseNumber()
  );

  const { type, file, sectionId } = action.payload;
  const formData = new FormData();
  formData.append("file", file);
  const params = new URLSearchParams({
    bracket: bracketId,
    phaseNumber,
  }).toString();

  const URL = `${UPLOAD_FILE_ENDPOINT}?${params}`;

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      sectionId,
    },
  };

  const { onProgress, channel } = yield call(createOnTypingChannel);
  try {
    yield fork(function* () {
      try {
        const res = yield call(requestWithProgress, URL, options, onProgress);
        yield put(contestantFormActions.contestantFormSaved(res));
        yield put(
          commonApiActions.deleteTranscoderJobStatus()
        );
        //++++++++++++++++++++++++++++++++++
        const params2 = new URLSearchParams({
          phaseNumber: phaseNumber,
          bracket: bracketId,
        }).toString();
        const URL2 = `${SUBMISSION_ENTRY_ENDPOINT}?${params2}`;
        const options2 = {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }),
        };
        const response = yield call(request, URL2, options2);
        //{type: 'textbox', answer: 'yjhghfjjhfgff', sectionId: 88125}
        const response2 = response.planList[0].contentList.find((answer) => {
          return answer.sectionId === sectionId;
        })
        yield put(contestantFormTemplateActions.contestantFormTemplateEntryReloadFileUpload(response));
        const { answer } = response2;
        yield put(contestantFormActions.updateFormField({ type, answer, sectionId }))

        //++++++++++++++++++++++++++++++++++
        yield put(
          globalActions.requestResponseReturned({
            error: null,
            message: 'File Uploaded Sucessfully',
          })
        );
      } catch (error) {
           yield put(
             globalActions.requestResponseReturned({
               error: true,
               message: "Unable to upload file",
             })
           ); 
        channel.close();
      }

      yield put(contestantFormActions.contestantFormUploadPhotoDone());
    });

    let progress = 0;
    // While the upload is not finished
    while (progress !== 100) {
      progress = yield take(channel);
      yield put(
        contestantFormActions.contestantFormUploadPhotoProgress(
          sectionId,
          progress
        )
      );
    }
  } catch (error) {
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to upload file",
      })
    );
    channel.close();
  }
}



function* removeUploadedFile(action) {
  const { sectionId, planId, type } = action.payload;
  const token = yield select(authSelectors.makeSelectToken());
  const bracketId = yield select(
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId()
  );
  const phaseNumber = yield select(
    dashboardSelectors.makeSelectCurrentPhaseNumber()
  );
  try {
    const params = new URLSearchParams({
      "locale": "en",
      "sectionId": sectionId,
      "planId": planId,
    }).toString();
    const URL = `${REMOVE_UPLOADED_FILE_ENDPOINT}?${params}`;
    const options = {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };
    const res = yield call(request, URL, options);
    yield put(contestantFormActions.contestantFormSaved(res));
    //++++++++++++++++++++++++++++++++++
    const params2 = new URLSearchParams({
      phaseNumber: phaseNumber,
      bracket: bracketId,
    }).toString();
    const URL2 = `${SUBMISSION_ENTRY_ENDPOINT}?${params2}`;
    const options2 = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, URL2, options2);
    yield put(contestantFormTemplateActions.contestantFormTemplateEntryReloadFileUpload(response));
    yield put(contestantFormActions.updateFormField({ type, undefined, sectionId }))

    //++++++++++++++++++++++++++++++++++
    yield put(
      globalActions.requestResponseReturned({
        error: null,
        message: "File Deleted is successfully",
      })
    );

  } catch (error) {
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to Remove File",
      })
    );
    const { response } = error;
    if (response && (response.status === 401 || response.status === 419)) {
      yield put(authActions.sessionExpired());
    }
  }

}

function* judgesComments(action) {
  const token = yield select(authSelectors.makeSelectToken());
  try {
    const params = new URLSearchParams({
      "planId": action.payload,
    }).toString();
    const URL = `${JUDGES_COMMENTS_ENDPOINT}?${params}`;
    const options = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    };
    const res = yield call(request, URL, options);
    yield put(commonApiActions.setjudgesComments(res));
  } catch (error) {
    console.log(error.message)
    const { response } = error;
    if (response && (response.status === 401 || response.status === 419)) {
      yield put(authActions.sessionExpired());
    }
  }
}


function* uploadContestantPhoto(action) {
  const token = yield select(authSelectors.makeSelectToken());
  const formData = new FormData();
  formData.append("file", action.payload);
  const URL = `${UPLOAD_CONTESTANT_PHOTO_ENDPOINT}`;
  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { onProgress, channel } = yield call(createOnTypingChannel);
  try {
    yield fork(function* () {
      try {
        const res = yield call(requestWithProgress, URL, options, onProgress);
        yield put(contestantFormActions.contestantFormSaved(res));
      } catch (error) {
        yield put(
          globalActions.requestResponseReturned({
            error: true,
            message: "Unable to update your profile picture",
          })
        );
        channel.close();
      }
      yield put(commonApiActions.uploadContestantPhotoProgressStart());
      /*  yield put(contestantFormActions.contestantFormUploadPhotoDone()); */
    });

    let progress = 0;
    // While the upload is not finished
    while (progress !== 100) {
      progress = yield take(channel);

      yield put(
        commonApiActions.uploadContestantPhotoProgressDone({
          progress
        }));
      if (progress === 100) {
        yield put(commonApiActions.profilePictureUploaded({
          loaded: true,
        }));
        yield put(
          globalActions.requestResponseReturned({
            error: null,
            message: "Your profile picture has been updated",
          })
        );
      }

    }
  } catch (error) {
    yield put(
      globalActions.requestResponseReturned({
        error: true,
        message: "Unable to update your profile picture",
      })
    );
    channel.close();
  }
}

function* transcoderJobStatus(action) {
  const token = yield select(authSelectors.makeSelectToken());
  if (action.payload) {
    try {
      const params = new URLSearchParams({
        "jobId": action.payload,
      }).toString();
      const URL = `${TRANSCODER_JOB_STATUS_ENDPOINT}?${params}`;
      const options = {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
      };
      const res = yield call(request, URL, options);
      yield put(commonApiActions.setTranscoderJobStatus(res));
    } catch (error) {
      console.log(error.message)
    }
  }
}



function* uploadFileSaga() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
}

function* removeUploadedFileSaga() {
  yield takeLatest(REMOVE_UPLOADED_FILE, removeUploadedFile);
}

function* judgesCommentsSaga() {
  yield takeLatest(JUDGES_COMMENTS, judgesComments);
}

function* getGetUiDesignInfoSaga() {
  yield takeEvery(LOAD_UI_INFO, getGetUiDesignInfo);
}
function* uploadContestantPhotoSaga() {
  yield takeLatest(UPLOAD_CONTESTANT_PHOTO, uploadContestantPhoto);
}

function* transcoderJobStatusSaga() {
  yield takeLatest(TRANSCODER_JOB_STATUS, transcoderJobStatus);
}

export default function* rootSaga() {
  yield all([getGetUiDesignInfoSaga(), uploadFileSaga(), removeUploadedFileSaga(), judgesCommentsSaga(), uploadContestantPhotoSaga(), transcoderJobStatusSaga()]);
}
