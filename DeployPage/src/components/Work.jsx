import styles from "./work.module.css";

const projects = [
  {
    id: 1,
    image: "assets/axis.png", 
    title: "AXIS® - Real Estate Consultancy",
    service: "Brand Development",
    location: "EGYPT",
  },
  {
    id: 2,
    image: "/images/fusion-form.jpg",
    title: "Fusion Form® - Architecture Development",
    service: "UI/UX Design & Web Development",
    location: "EGYPT",
  },
  {
    id: 3,
    image: "/images/studio-juzenas.jpg",
    title: "STUDIO JUZĖNAS - Architecture Studio",
    service: "Brand Development | UI/UX Design & Web Development",
    location: "VILNIUS, LITHUANIA",
  },
  {
    id: 4,
    image: "/assets/amk.png",
    title: "AMK",
    service: "Web Development",
    location: "EGYPT",
  },
];

function Work() {
  return (
    <div className={styles.campaignTextContainer}>
      <p className={styles.campaignTextMain}>
        NORQUE STUDIOS is a firm that was born in Cairo in 2026, we
        develop brands & websites to the whole world. We are proudly
        launching a DONE-BY-HUMANS Campaign because we still
        believe in human creativity.
      </p>
      <span className={styles.campaignTextSub}>
        BUILT FOR THE WHOLE WORLD
      </span>
      <h2 className={styles.h2}>SELECTED WORKS <span>(04)</span></h2>
      <div className={styles.workGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.workItem}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.workImage}
            />
            <div className={styles.workInfo}>
              <h3 className={styles.workTitle}>{project.title}</h3>
              <p className={styles.workService}>{project.service}</p>
              <p className={styles.workLocation}>{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
