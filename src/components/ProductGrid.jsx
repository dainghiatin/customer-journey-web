import React from "react";
import ProductGridEditable from "./ProductGridEditable";
import ProductGridReadOnly from "./ProductGridReadOnly";

export default function ProductGrid({ products = [], readOnly = false, onItemsChange }) {
  return readOnly ? (
    <ProductGridReadOnly products={products} onItemsChange={onItemsChange} />
  ) : (
    <ProductGridEditable products={products} onItemsChange={onItemsChange} />
  );
}