import { Breadcrumb } from 'antd';

export type BreadCrumbItems = {
  title: string;
  link?: React.ReactNode;
};

export interface BreadCrumbProps {
  item: BreadCrumbItems[];
}

export const BreadCrumbNav = ({ item }: BreadCrumbProps) => {
  return (
    <>
      <Breadcrumb>
        {item.map((item, i) => (
          <Breadcrumb.Item>
            {item.link ? <a href={item.link}>{item.title}</a> : item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};
