import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./NewsPage.css";

const NewsPage = (props) => {
  const [newsInfo, setnewsInfo] = useState("1245620,PCGamesN");
  const [newsContent, setNewsContent] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    const getSteamNews = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/forum_posts/steamexternal/${newsInfo}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = JSON.parse(response.data);
        setNewsContent(data.appnews.newsitems);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSteamNews();
  }, [newsInfo]);

  //   async function getOtherSoulsNews(){
  //     try {
  //         let response = await axios.post(`http://127.0.0.1:8000/api/forum_posts/soulsnews/${appId}/`, {
  //             headers: {
  //                 Authorization: 'Bearer ' + token
  //             }
  //         })
  //         const data = JSON.parse(response.data)
  //         setNewsContent(data.appnews.newsitems);
  //     } catch (error) {
  //         console.log(error.message)
  //     }
  // }

  return (
    <>
      <div className="row">
        <div className="col-md-11 mx-auto">
          <label for="news" style={{ color: "white" }}>
            News Selections
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-lg-5 ps-4">
          <select
            id="news"
            value={newsInfo}
            onChange={(e) => setnewsInfo(e.target.value)}
          >
            <option value={"1245620,PCGamesN"} selected>
              Elden Ring
            </option>
            <option value={"374320,PCGamesN"}>Dark Souls 3</option>
            <option value={"335300,PCGamesN"}>
              Dark Souls II: Scholar of the First Sin
            </option>
            <option value={"570940,PCGamer"}>Dark Souls Remastered</option>
            <option value={"814380,Rock, Paper, Shotgun"}>
              Sekiro: Shadows Die Twice
            </option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 px-0">
          {newsContent &&
            newsContent.map((article) => (
              <>
                <br />
                <div class="card">
                  <h5 class="card-header">{article.title}</h5>
                  <div class="card-body">
                    <div
                      class="card-text"
                      dangerouslySetInnerHTML={{ __html: article.contents }}
                    ></div>
                  </div>
                </div>
                <br></br>
              </>
              // <div>
              //   <br></br>
              //   <div>
              //     <h1><strong>{article.title}</strong></h1>
              //     <div dangerouslySetInnerHTML={{__html:  article.contents}} />
              //   </div>
              // </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
