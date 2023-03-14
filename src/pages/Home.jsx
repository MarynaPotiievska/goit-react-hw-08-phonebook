import { Typography } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';

const Home = () => {
  return (
    <main>
      <Typography
        variant="h2"
        color="primary"
        sx={{ textAlign: 'center', mb: '16px', pt: '120px' }}
      >
        Welcome to the Phonebook!
        <MoodIcon color="primary" fontSize="large" />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        Please, register or log in.
      </Typography>
    </main>
  );
};

export default Home;
