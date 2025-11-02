"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

function ProductCard({ id, name, price, image, description, onBuy }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) navigate(`/detail/${id}`, { state: { randomImage: image } });
  };

  return (
    <div
      className="relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex h-60 justify-center">
        <img src={image} alt={name} className="w-75" />
      </div>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="h-16">
          <p>{description}</p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">{price} $</span>
          </div>
          <Button
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onBuy();
            }}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductCard;
