import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <Button
        variant={"secondary"}
        className="bg-black lg:text-lg"
      >
        Click me
      </Button>
      <div className="size-40 bg-black">elo</div>
    </>
  );
};

export default Home;
