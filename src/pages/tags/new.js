import FormSaveChangeTag from "@/components/form/tags/FormSaveChangeTag";

export default function CreateNewTag() {
  const initialValues = {
    name: '',
    description: '',
  };

  const handleSubmit = () => {
    // Xử lý logic tạo mới dữ liệu
  };

  return (
    <div>
      <h1>Create New Tags</h1>
      <MyForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
}
