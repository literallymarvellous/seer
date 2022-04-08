import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useRenders } from "../../hooks/useRenders";
import { getResolver } from "../../utils/ethersFuncs";

type SearchProps = {
  props: { address: string; setAddress: Dispatch<SetStateAction<string>> };
};

export const Search = ({ props: { address, setAddress } }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resolver = await getResolver(query);
    if (resolver === null) {
      setError("No resolver found for this ens name");
    } else {
      setAddress(query);
      setError("");
    }
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
      {error ? <p>{error}</p> : null}
    </form>
  );
};
