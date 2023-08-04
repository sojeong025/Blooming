import { Button } from "antd-mobile";

export default function CustomButton({ fill, loading = false }) {
  return (
    <Button loading={loading} block color='primary' size='large' fill={fill}>
      Block Button
    </Button>
  );
}
