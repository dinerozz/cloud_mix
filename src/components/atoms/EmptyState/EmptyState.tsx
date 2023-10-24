import React, { FC } from "react";
import DogIcon from "@/components/atoms/Icons/DogIcon";
import { Empty } from "antd";

export type TEmptyStateProps = {
  className?: string;
  description?: string;
};

export const EmptyState: FC<TEmptyStateProps> = ({
  className = "flex-grow w-full bg-primaryChat flex items-center justify-center",
  description = "Select chat from chat list",
}) => {
  return (
    <div className={className}>
      <Empty
        image={<DogIcon width={128} height={128} />}
        description={
          <p className="text-primaryText text-[18px]">{description}</p>
        }
      />
    </div>
  );
};
