import { gql } from '@apollo/client';

// FAQ Section query using the same structure as other sections
export const GET_FAQ_SECTION_DATA = gql`
  query GetFAQSectionData {
    homePage {
      data {
        id
        attributes {
          FAQSection {
            Title
            Thumbnail {
              data {
                attributes {
                  url
                }
              }
            }
            Description
            faqs {
              data {
                attributes {
                  Question
                  Answer
                }
              }
            }
          }
        }
      }
    }
  }
`;

// TypeScript interfaces for the response
export interface FAQ {
  Question: string;
  Answer: string;
}

export interface FAQSectionData {
  Title: string;
  Thumbnail: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  Description: string;
  faqs: {
    data: FAQ[];
  };
}

export interface FAQSectionResponse {
  homePage: {
    data: {
      id: string;
      attributes: {
        FAQSection: FAQSectionData;
      };
    };
  };
}
