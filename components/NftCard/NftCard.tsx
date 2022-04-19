import { Nft } from "@alch/alchemy-web3";
import styled from "styled-components";

type NftCardProps = {
  nft: Nft;
};

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <Wrapper>
      <ImageWrapper>
        {nft.metadata?.image?.slice(0, 4) === "ipfs" ? (
          <Image
            src={"https://ipfs.io/ipfs/" + nft.metadata.image.slice(7)}
            alt={nft.title}
          />
        ) : (
          <Image src={nft.metadata?.image} alt={nft.title} />
        )}
      </ImageWrapper>

      <CardTitle>{nft.title}</CardTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CardTitle = styled.div`
  padding: 8px 16px;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDescription = styled.p`
  padding: 0 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: 0% center;
`;
