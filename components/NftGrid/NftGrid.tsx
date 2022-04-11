import { Nft } from "@alch/alchemy-web3";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { NftCard } from "../NftCard";

type NFTGridProps = {
  nfts: Nft[];
};

export const NftGrid = ({ nfts }: NFTGridProps) => {
  return (
    <Wrapper>
      {nfts.length > 0
        ? nfts.map((nft) => {
            return nft.title ? (
              <NFTWrapper key={uuidv4()}>
                <NftCard nft={nft} />
              </NFTWrapper>
            ) : null;
          })
        : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const NFTWrapper = styled.div`
  min-width: 250px;
  flex: 1;
`;
