import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="#093C01"
      strokeWidth="2"
      animationDuration="0.75"
      width="12"
      visible={true}
    />
  );
};

export default Loader;
