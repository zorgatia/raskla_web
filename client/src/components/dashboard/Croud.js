import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import Spinner from "../layout/Spinner";
import CountUp from "react-countup";

const Croud = props => {
  const [data, setData] = useState({ users: 0, vendings: 0, vends: 0 });
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const response = await Axios.get(`/api/data/croud`);
      console.log(response.data)
      setData(response.data);
      setLoad(false);
    };
    loadData();
  }, []);

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center m-t-10">
              <img src="/assets/green.png"  style={{width:"3.5em",height:"3.5em"}}></img>
                <h2 className="m-t-15 m-b-0">
                  { load ? ( 0 ) : ( <CountUp end={data.vendings} duration={3}></CountUp>) } Machines
                </h2>
                <p className="f-s-12"></p>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center m-t-10">
                <img src="/assets/Plas.png"  style={{width:"3.5em"}}></img>
                
                <h2 className="m-t-15 m-b-0">{ load ? ( 0 ) : ( <CountUp end={data.vends} duration={3}></CountUp>) } Bottles</h2>
                <p className="f-s-12"></p>
               
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center m-t-10">
                <i className="icon-user f-s-50 text-primary"></i>
                <h2 className="m-t-15 m-b-0">{ load ? ( 0 ) : ( <CountUp end={data.users} duration={3}></CountUp>) } Users </h2>
                <p className="f-s-12"></p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Croud.propTypes = {};

export default Croud;
