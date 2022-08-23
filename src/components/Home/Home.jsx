import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';


const Home = () => {

   const scrollRef = useRef(null);

   const [data, setData] = useState([]);
   const [start, setStart] = useState(0);
   const [end, setEnd] = useState(10);

   const [onlyEven, setOnlyEven] = useState(false);

   const getContactList = async (start, end, isEven) => {
      setStart(start);
      setEnd(end);
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      if (isEven) {
         const evenResult = response.data.filter((el) => {
            return (
               el.id % 2 === 0
            )
         });
         console.log(evenResult);
         setData(evenResult.slice(start, end));
      }
      else {
         setData(response.data.slice(start, end));
      }
   }

   useEffect(() => {
      getContactList(start, end);
   }, []);

   const onScroll = (e) => {
      // console.log(scrollRef.current.getScrollHeight());
      // console.log(scrollRef.current.getScrollTop());
      // console.log(parseInt(scrollRef.current.getScrollHeight() - scrollRef.current.getScrollTop()));
      // console.log(scrollRef.current.getClientHeight());

      const isBottom = parseInt(scrollRef.current.getScrollHeight() - scrollRef.current.getScrollTop()) <= scrollRef.current.getClientHeight();
      if (isBottom) {
         let end_ = end + 10;
         getContactList(start, end_, onlyEven);
      }
   }

   const handleChange = (e) => {
      if (e.target.checked) {
         setOnlyEven(e.target.checked);
         getContactList(start, end, e.target.checked);
      }
   }

   return (
      <>
         <div className="main">
            <button
               type="button"
               className="btn btn-A"
               data-toggle="modal"
               data-target="#buttonA"
            >
               Button A
            </button>
            <button
               type="button"
               className="btn btn-B"
               data-toggle="modal"
               data-target="#buttonB"
            >
               Button B
            </button>

            <div className="modal fade" id="buttonA" tabIndex="-1" aria-labelledby="buttonALabel" aria-hidden="true">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="buttonALabel">Modal A</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <Scrollbars
                           id="contactList"
                           style={{ width: "100%", height: 300 }}
                           onScroll={onScroll}
                           ref={scrollRef}
                        >
                           {data && data.length > 0 && data.map((item, index) => (
                              <div className="contacts" key={index}>
                                 <h4>{item.id}. {item.title}</h4>
                                 <p>{item.body}</p>
                              </div>
                           ))}
                        </Scrollbars>

                        <div className="custom-control custom-checkbox">
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              id="onlyEven"
                              value={onlyEven}
                              onChange={handleChange}
                           />
                           <label className="custom-control-label" htmlFor="onlyEven">
                              Only Even
                           </label>
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-A"
                           data-toggle="modal"
                           data-target="#buttonA"
                        >
                           All Contacts
                        </button>
                        <button
                           type="button"
                           className="btn btn-B"
                           data-toggle="modal"
                           data-target="#buttonB"
                        >
                           US Contacts
                        </button>
                        <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>

                     </div>
                  </div>
               </div>
            </div>


            <div className="modal fade" id="buttonB" tabIndex="-1" aria-labelledby="buttonBLabel" aria-hidden="true">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="buttonBLabel">Modal B</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        ...
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Home;