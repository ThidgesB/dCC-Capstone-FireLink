import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateReqModal from "../../components/CreateReqModal/CreateReqModal";
import EditRequestModal from "../../components/EditRequestModal/EditRequestModal";
import "./HelpRequestPage.css";

const HelpRequestPage = () => {
  const [user, token] = useAuth();
  const [requests, setRequests] = useState([]);
  //const [platforms, setPlatforms] = useState([]);
  const [offerState, setOfferState] = useState(false);
  const [requestFormModalState, setRequestFormModalState] = useState(false);
  const [editRequestModalState, setEditRequestModalState] = useState(false);
  const [requestId, setRequestId] = useState("");

  const handleOfferClick = () => {
    setOfferState(!offerState);
  };

  const handleClose = () => {
    setRequestFormModalState(false);
  };

  const onCreateRequest = () => {
    setRequestFormModalState(true);
  };

  const onEditRequest = (request) => {
    setEditRequestModalState(true);
    setRequestId(request.id);
  };

  const handleEditClose = () => {
    setEditRequestModalState(false);
  };

  const onDeleteRequest = (request) => {
    deleteRequest(request);
  };

  async function deleteRequest(request) {
    let response = await axios.delete(
      `http://127.0.0.1:8000/api/help_requests/user/requests/delete/${request.id}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/help_requests/all/requests/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRequests();
  }, [token]);

  return (
    <>
      <CreateReqModal
        show={requestFormModalState}
        handleClose={handleClose}
        initialValues={{
          game: "",
          details: "",
          active_state: "true",
          players_requested: "",
          platform: "",
        }}
      />
      <EditRequestModal
        show={editRequestModalState}
        handleClose={handleEditClose}
        requestId={requestId}
        initialValues={{
          game: "",
          details: "",
          active_state: "true",
          players_requested: "",
          platform: "",
        }}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1 style={{ color: "white" }}>
              Request Page for {user.username}!
            </h1>
            <br></br>
            <button type="button" className="btn-create" onClick={onCreateRequest}>
              Create Request
            </button>
          </div>
        </div>
        {requests &&
          requests
            .map((request) => (
              <>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="request-box">
                      <br></br>
                      <div className="row justify-content-center">
                        <div className="col-lg-4">
                          <h4>{request.user.username}</h4>
                        </div>
                        <div className="col-lg-4">
                          <div>{request.date_posted}</div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <h5>{request.platform.platform_name}</h5>
                          <h5>{request.game}</h5>
                        </div>
                        <div className="col-md-12">
                          <h5>
                            Players Requested: {request.players_requested}
                          </h5>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-10">
                          <b>Details: {request.details}</b>
                        </div>
                      </div>
                      <br></br>
                      {user.id !== request.user.id && (
                        <>
                          <div className="row justify-content-center">
                            <div className="col-md-6">
                              <button type="button" className="btn-offer" onClick={handleOfferClick}>
                                Offer
                              </button>
                            </div>
                          </div>
                          <br></br>
                        </>
                      )}
                      {user.id === request.user.id && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <button
                                className="btn-edit"
                                type="button"
                                onClick={() => onEditRequest(request)}
                              >
                                <i class="fa-solid fa-pencil"></i> Edit
                              </button>
                            </div>
                            <div className="col-md-6">
                              <button
                                className="btn-delete"
                                type="button"
                                onClick={() => onDeleteRequest(request)}
                              >
                                <i className="fa-solid fa-trash"></i> Delete
                              </button>
                            </div>
                          </div>
                          <br></br>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))
            .reverse()}
      </div>
      <style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </style>
    </>
  );
};
export default HelpRequestPage;
