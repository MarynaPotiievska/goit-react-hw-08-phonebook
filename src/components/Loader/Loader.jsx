import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="#ffffff"
      strokeWidth="2"
      animationDuration="0.75"
      width="12"
      visible={true}
    />
  );
};

export default Loader;
