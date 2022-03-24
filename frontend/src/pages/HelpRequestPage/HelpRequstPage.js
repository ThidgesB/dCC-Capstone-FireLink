import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CreateReqModal from "../../components/CreateReqModal/CreateReqModal";
import EditRequestModal from "../../components/EditRequestModal/EditRequestModal";

const HelpRequestPage = () => {

    const [user, token] = useAuth();
    const [requests, setRequests] = useState([]);
    //const [platforms, setPlatforms] = useState([]);
    const [offerState, setOfferState] = useState(false);
    const [requestFormModalState, setRequestFormModalState] = useState(false);
    const [editRequestModalState, setEditRequestModalState] = useState(false);
    const [requestId, setRequestId] = useState("");
    

    const handleOfferClick = () => {
      setOfferState(!offerState)
    }

    const handleClose = () => {
      setRequestFormModalState(false);
    };


    const onCreateRequest = () => {
      setRequestFormModalState(true)
    }

    const onEditRequest = (request) => {
      setEditRequestModalState(true);
      setRequestId(request.id)
    }

    const handleEditClose = () => {
      setEditRequestModalState(false);
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
              platform: ""
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
              platform: ""
            }}
          />
          <div className="container">
          <h1>Multiplayer Request Page for {user.username}!</h1>
          <button type="button" onClick={onCreateRequest}>
            Create
          </button>
          {requests &&
            requests
              .map((request) => (
                <div className="post-box">
                    <div>{request.user.username}</div>
                    <h4>{request.platform.platform_name}</h4>
                    <h4>{request.game}</h4>
                    <div>
                        {request.date_posted}
                    </div>
                    <div>
                      Players Requested: {request.players_requested}
                  </div>
                  <div>
                    Details: {request.details}
                  </div>
                  {user.id !== request.user.id && 
                  <button type="button" onClick={handleOfferClick}>
                  Offer
                </button>
                  }
                  {user.id === request.user.id &&
                    <button type="button" onClick={() => onEditRequest(request)}>
                      Edit
                    </button>
                  }
                </div>
              )).reverse()}
        </div>
        </>
      )





}
export default HelpRequestPage