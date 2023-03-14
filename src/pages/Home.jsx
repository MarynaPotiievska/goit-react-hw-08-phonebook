import { Typography } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';

const Home = () => {
  return (
    <main>
      <Typography
        variant="h1"
        color="primary"
        sx={{ textAlign: 'center', mb: '16px' }}
      >
        Welcome to the Phonebook!
        <MoodIcon color="primary" />
      </Typography>
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        Please, register or log in.
      </Typography>
    </main>
  );
};

export default Home;
