import { GetServerSidePropsContext, NextPage } from "next";
import * as Api from "@/api";
import { checkAuth } from "@/utils/checkAuth";
import { Layout } from "@/layouts/Layout";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";

interface DashboardProps {
  items: Array<FileItem>;
}

const Dashboard: NextPage<DashboardProps> = ({ items }) => (
  <DashboardLayout>
    <Files items={items} withActions />
  </DashboardLayout>
);

// @ts-ignore
Dashboard.getLayout = (page: React.ReactNode) => (
  <Layout title="Dashboard / Main">{page}</Layout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll();

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: { items: [] },
    };
  }
};

export default Dashboard;
