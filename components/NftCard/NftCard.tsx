import { Nft } from "@alch/alchemy-web3";
import styled from "styled-components";

type NftCardProps = {
  nft: Nft;
};

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <div>
      <CardTitle>{nft.title}</CardTitle>
      <ImageWrapper>
        {nft.metadata?.image?.slice(0, 4) === "ipfs" ? (
          // <Image
          //   src={
          //     "https://ipfs.io/ipfs/" + nft.metadata.image.slice(7)
          //   }
          //   alt={nft.title}
          //   width={250}
          //   height={250}
          // />
          <Image
            src={"https://ipfs.io/ipfs/" + nft.metadata.image.slice(7)}
            alt={nft.title}
            width="250"
            height="250"
          />
        ) : (
          // <Image
          //   src={nft.metadata?.image as string}
          //   alt={nft.title}
          //   width={250}
          //   height={250}
          // />
          <Image
            src={nft.metadata?.image}
            alt={nft.title}
            width="250"
            height="250"
          />
        )}
      </ImageWrapper>
    </div>
  );
};

const CardTitle = styled.h1`
  width: fit-content;
`;

const CardDescription = styled.div`
  width: 50ch;
`;

const ImageWrapper = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  object-fit: fill;
`;
