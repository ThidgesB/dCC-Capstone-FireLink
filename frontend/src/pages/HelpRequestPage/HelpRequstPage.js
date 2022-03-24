import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const HelpRequestPage = () => {

    const [user, token] = useAuth();
    const [requests, setRequests] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [offerState, setOfferState] = useState(false);
    const [requestFormModalState, setRequestFormModalState] = useState(false);
    const [editRequestModalState, setEditRequestModalState] = useState(false);
    const uid = user.id || user.user_id

    const handleOfferClick = () => {
      setOfferState(!offerState)
    }


    const onCreateRequest = () => {
      setRequestFormModalState(true)
    }


    // useEffect(() => {
    //     const fetchPlatforms = async () => {
    //       try {
    //         let response = await axios.get(
    //           "http://127.0.0.1:8000/api/help_requests/all/platforms",
    //           {
    //             headers: {
    //               Authorization: "Bearer " + token,
    //             },
    //           }
    //         );
    //         setPlatforms(response.data);
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     };
    //     fetchPlatforms();
    //   }, [token]);


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
                {user.id != request.user.id && 
                <button type="button" onClick={handleOfferClick}>
                Offer
              </button>
                }
                
              </div>
            )).reverse()}
      </div>
      )





}
export default HelpRequestPage