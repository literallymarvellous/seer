import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useRenders } from "../../hooks/useRenders";

type SearchProps = {
  props: { address: string; setAddress: Dispatch<SetStateAction<string>> };
};

export const Search = ({ props: { address, setAddress } }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddress(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="address">Enter eth address or ens name</label>
      <input
        type="text"
        id="address"
        placeholder="0x58de6..., nick.eth"
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};
