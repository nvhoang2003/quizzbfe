import { TextField, Button, FormControl } from '@mui/material';

export default function FormSaveChangeTag({ initialValues, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onSubmit và truyền giá trị của form
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField label="Name" value={initialValues.name} />
      </FormControl>
      <FormControl>
        <TextField label="Description" value={initialValues.description} />
      </FormControl>
      <Button variant="contained" type="submit">
        Save
      </Button>
    </form>
  );
}