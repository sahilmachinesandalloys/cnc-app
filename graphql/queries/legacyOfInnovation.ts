import { gql } from '@apollo/client';

// Legacy of Innovation section query (using Discover section from CMS)
export const GET_LEGACY_OF_INNOVATION_DATA = gql`
  query GetLegacyOfInnovationData {
    homePage {
      data {
        id
        attributes {
          Discover {
            Title
            HighlightedText
            ContentBlock1 {
              Title
              Description
              RedirectURL
            }
            ContentBlock2 {
              Title
              Description
              RedirectURL
            }
            Stats {
              id
              Number
              Info
            }
          }
        }
      }
    }
  }
`;

// TypeScript interfaces for the response
export interface ContentBlock {
  Title: string;
  Description: string;
  RedirectURL: string;
}

export interface Stat {
  id: string;
  Number: string;
  Info: string;
}

export interface DiscoverSection {
  Title: string;
  HighlightedText: string;
  ContentBlock1: ContentBlock;
  ContentBlock2: ContentBlock;
  Stats: Stat[];
}

export interface LegacyOfInnovationResponse {
  homePage: {
    data: {
      id: string;
      attributes: {
        Discover: DiscoverSection;
      };
    };
  };
}
