import { Breadcrumb } from 'antd';
import Link from 'next/link';

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
          <Breadcrumb.Item key={i}>
            {item.link ? (
              <Link href={item.link as string}>{item.title}</Link>
            ) : (
              item.title
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};
