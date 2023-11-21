import { useParams } from "react-router-dom";
import { ProductComponent } from "~/components/ProductComponent";
import { useProductService } from "~/services/productService";

export const ProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const productService = useProductService();
  const product = productService.useProductGet(+productId);

  switch (product.type) {
    case "Pending":
      return <>Loading ...</>;
    case "Failure":
      return <>Failed: {product.error.message}</>;
    case "Success":
      return <ProductComponent product={product.data} />;
  }
};
