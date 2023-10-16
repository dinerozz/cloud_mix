import { Tag } from 'antd';

export const handleUserStatus = (status: boolean) => {
  switch (status) {
    case true:
      return (
        <Tag className="w-full text-center" color="success">
          Подтвержден
        </Tag>
      );
    default:
      return (
        <Tag className="w-full text-center" color="error">
          Не подтвержден
        </Tag>
      );
  }
};
