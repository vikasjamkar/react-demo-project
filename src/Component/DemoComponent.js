import { useEffect, useState } from "react";

const DemoComponent = () => {
  const [mars, setMars] = useState([]);
  const handleApi = async () => {
    const response = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY"
    );
    const data = await response.json();
    setMars(data.photos);
  };
  useEffect(() => {
    handleApi();
  }, []);

  return (
    <div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Preview</th>
              <th>Camera</th>
              <th>Released date</th>
            </tr>
          </thead>
        </table>
        <tbody>
          {mars.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src={item.img_src} alt="" width="200" height="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};
export default DemoComponent;
