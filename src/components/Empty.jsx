import { Image } from "react-bootstrap";

const Empty = () => {
  return (
    <div className="py-12">
      <div className=" py-10 flex justify-center">
        <Image width={100} src="/assets/imgs/empty-box.png" />
      </div>
      <h1 className="text-center text-xl text-gray-400">No Data Found</h1>
    </div>
  );
};

export default Empty;
