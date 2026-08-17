import styles from "./work.module.css";

const projects = [
  {
    id: 1,
    image: "assets/axis.png",
    title: "AXIS® - Real Estate Consultancy",
    service: "Brand Development",
    location: "EGYPT",
    link: "https://www.instagram.com/axisre.eg/",
  },
  {
    id: 2,
    image: "assets/FF.png",
    title: "Fusion Form® - Architecture <br> Development </br>",
    service: "UI/UX Design & Web Development",
    location: "EGYPT",
    link: "https://www.fusionformad.com",
  },
  {
    id: 3,
    image: "assets/shawmi.png",
    title: "STUDIO JUZĖNAS - Architecture Studio",
    service: "Brand Development | UI/UX Design ",
    location: "LITHUANIA",
  },
  {
    id: 4,
    image: "/assets/amk.png",
    title: "AMK",
    service: "Web Development",
    location: "EGYPT",
    link: "https://amk-sol.com/",
  },
];

function Work() {
  return (
    <div  className={styles.campaignTextContainer}>
      <p className={styles.campaignTextMain}>
        NORQUE STUDIOS is a firm that was born in Cairo in 2026, we develop
        brands & websites to the whole world. We are proudly launching a
        DONE-BY-HUMANS Campaign because we still believe in human creativity.
      </p>
      <span className={styles.campaignTextSub}>BUILT FOR THE WHOLE WORLD</span>
      <h2 id="work"  className={styles.h2}>
        SELECTED WORKS <sup>(04)</sup>
      </h2>
      <div  className={styles.workGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.workItem}>
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={project.image}
                alt={project.title}
                className={styles.workImage}
              />
              <div className={styles.workInfo}>
                <div className={styles.workInfoLeft}>
                  <h3 className={styles.workTitle}>{project.title}</h3>
                  <p className={styles.workService}>{project.service}</p>
                </div>
                <p className={styles.workLocation}>{project.location}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
