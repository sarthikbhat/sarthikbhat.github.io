import React from "react";
import projects from "../projectConst";
const Projects = () => {
  return (
    <section className="container-fluid">
      <h2 className="">Projects</h2>
      <hr/>
      <div className="p-card-outer mt-5 ">
        {Object.keys(projects).map((elm, index) => {
          return (
            <div className="p-card">
              <div className="row my-2">
                <h4 className="col-10">{projects[elm].name}</h4>
                <i className="fas fa-code col-2 align-self"></i>
              </div>
              <hr />
              <p className="p-desc">{projects[elm].description}</p>
              <hr />
              <div>
                <h5>Tect Stack</h5>
                <div className="d-flex stack">
                  {projects[elm].tags.map((e, i) => {
                    return <div className="m-1">{e}</div>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
