import Nav from "./layout/Nav";
import MainLogoAnimation from "./MainLogoAnimation";
import Work from "./Work";

function Home() {
  return (
    <main className="grid-container">
      <Nav />
      <MainLogoAnimation />
      <Work/>
    </main>
  );
}

export default Home;
