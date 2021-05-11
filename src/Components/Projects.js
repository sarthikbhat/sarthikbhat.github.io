import React from "react";
import projects from "../projectConst";
const Projects = () => {

  const [proj, setProj] = React.useState('Coptime')
  const [i, seti] = React.useState(-1)

  function changeDesc(project) {
    setTimeout(() => {
      document.querySelector('.pt').classList.add('fader')
      document.querySelector('.stack').classList.add('fader')
      document.querySelector('.p-desc').classList.add('fader')
      document.querySelector('.ts').classList.add('fader')
      document.querySelector('.hr').classList.add('fader')
      setProj(project)
    }, 200);
  }
  function remover() {

    // setTimeout(() => {
    document.querySelector('.pt').classList.remove('fader')
    document.querySelector('.stack').classList.remove('fader')
    document.querySelector('.p-desc').classList.remove('fader')
    document.querySelector('.ts').classList.remove('fader')
    document.querySelector('.hr').classList.remove('fader')
    // }, 100);
  }

  function setterse(index){
    if(i===index) seti(-1)
    else seti(index)
  }

  return (
    <>
      <section className="container-fluid hideBelow766">
        <h2 className="heading">Projects</h2>
        <div className="row g-0 mister" >
          <div className='col-6 project-list'>
            {Object.keys(projects).map((elm, index) => {
              return (
                <a href={projects[elm].link} className='no-pls'  target='_BLANK' rel=" noopener noreferrer">
                <div className='outer' onMouseOver={() => changeDesc(elm)} onMouseOut={() => remover()} key={index}>
                  <h4 className="p-title">{index + 1}. {projects[elm].name}</h4>
                  <p className='dets'> {projects[elm].extra}</p>
                </div>
                </a>)
            })}
          </div>
          <div className='col-5 project-description'>
            <div className="p-card" >
              <div className="row my-2">
                <h4 className="col-10 heading pt">{projects[proj].name}</h4>
              </div>
              <p className="p-desc">{projects[proj].description}</p>
              <hr className='hr' />
              <div>
                <h5 className='ts'>Tech Stack</h5>
                <div className="d-flex stack">
                  {["ReactJs", "ExpressJs", "Python", "MongoDb"].map((e, i) => {
                    return <div className="m-1" key={i}>{e}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid hideAbove766">
        <h2 className="heading">Projects</h2>
        <div className="row g-0 mister" >
          <div className='col project-list-sm'>
            {Object.keys(projects).map((elm, index) => {
              return (
                <div className='outer-sm' onClick={()=>setterse(index)}>
                  <div className="row">
                  <h4 className="p-title col-10">{index + 1}. {projects[elm].name}</h4>
                  <a href={projects[elm].link} className='no-pls col-2' target='_BLANK' rel=" noopener noreferrer"><i className="fas fa-code align-self"></i></a>
                  </div>
                  <p className='dets'> <span>1 Dec 2020  SIH 2020</span></p>
                  {
                    i===index?
                    <div className="p-card" >
                    <p className="p-desc">{projects[proj].description}</p>
                    <hr className='hr' />
                    <div>
                      <h5 className='ts'>Tech Stack</h5>
                      <div className="d-flex stack">
                        {["ReactJs", "ExpressJs", "Python", "MongoDb"].map((e, i) => {
                          return <div className="m-1" key={i}>{e}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                  :
                  <></>
                  }
                </div>)
            })}
          </div>
          {/* <div className='col-5 project-description'>
         <div className="p-card" >
           <div className="row my-2">
             <h4 className="col-10 heading pt">{projects[proj].name}</h4>
           </div>
           <p className="p-desc">{projects[proj].description}</p>
           <hr className='hr' />
           <div>
             <h5 className='ts'>Tech Stack</h5>
             <div className="d-flex stack">
               {["ReactJs", "ExpressJs", "Python", "MongoDb"].map((e, i) => {
                 return <div className="m-1" key={i}>{e}</div>;
               })}
             </div>
           </div>
         </div>
       </div> */}
        </div>
      </section>
    </>
  );
};

export default Projects;
