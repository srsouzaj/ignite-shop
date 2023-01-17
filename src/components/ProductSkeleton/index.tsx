import { ComponentProps } from "react";
import { ProductSkeletonContainer, SkeletonItem } from "./styled";

type ProductSkeletonProps = ComponentProps<typeof ProductSkeletonContainer>;

export const ProductSkeleton = ({ ...props }: ProductSkeletonProps) => {
    return (
        <ProductSkeletonContainer {...props}>
            <SkeletonItem />
            <div>
                <SkeletonItem />
                <SkeletonItem />
            </div>
        </ProductSkeletonContainer>
    );
}