import React, { useState, useEffect } from 'react';
import '../css/browse.css'; // Ensure the CSS path is correct
import { useNavigate } from 'react-router-dom';

interface Auction {
  _id: string;
  title: string;
  imageUrl?: string; // Assuming imageUrl is optional
  description: string;
  currentPrice: number;
  status: string;
}



const BrowseAuctions: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuctions(); // Call fetchAuctions initially when the component mounts
  }, []); // The empty array ensures this effect only runs once on mount

  const fetchAuctions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/auctions`);
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const data: Auction[] = await response.json();
      setAuctions(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch auctions');
      console.error('Failed to fetch auctions:', error);
    }
    setIsLoading(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAuctions = auctions.filter(auction =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAuctionClick = (auctionId: string) => {
    navigate(`/auction/${auctionId}`); // Navigate to the specific auction detail page
  };


  return (
    <div className="brcontainer">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search auctions..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => fetchAuctions()}>Search</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredAuctions.length > 0 ? (
        filteredAuctions.map((auction) => (
          <div className="auction-card" key={auction._id} onClick={() => handleAuctionClick(auction._id)}>
            <div className="item-image">
              <img src={auction.imageUrl || 'placeholder.jpg'} alt={auction.title} />
            </div>
            <div className="auction-details">
              <h2 className="auction-title">{auction.title}</h2>
              <p className="description">{auction.description}</p>
              <p>Current Price: ${auction.currentPrice}</p>
              <p className="status">{auction.status}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );

};

export default BrowseAuctions;
