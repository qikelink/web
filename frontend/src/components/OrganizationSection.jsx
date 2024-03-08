import React from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CreateOrganization from '@/utils/CreateOrganization';

const OrganizationSection = () => {
  return (
    <div className="flex w-full flex-col text-black ">
      <Tabs aria-label="Options" fullWidth={true}>
        <Tab key="createOrganization" title="Create New Organization">
          <CreateOrganization/>
        </Tab>
        <Tab key="organization" title="Organization">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default OrganizationSection