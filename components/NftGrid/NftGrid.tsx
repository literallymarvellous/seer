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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  gap: 16px;
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NFTWrapper = styled.div`
  min-width: 300px;
  flex: 1;
`;
