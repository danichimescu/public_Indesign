
# general info

 1. input: a lot of magazines ready for print with a lot of products an description

 2. output: a tab text delimited with info: name of image of product, description of product - title and other info, name of file, path of file


# about > **01_clean docuemnt.jsx**


## this script is preparing the indesign file ready to print (the magazine) for export info

**what script do:**

 1. Revmove all items out of page

  2. Create new layers for text and images

  3. Apply master none and remove master elements

  4. Unlock all items

  5. Ungroup all objects

  6. Remove all empty textframes

  7. Move textframes to new layer

  8. Move all images to new layer and delete background and ornament images // filter logo files

  9. Performing a final clean with custom unnecessary images and text which are repeating

  10. Saving document with new name

## **before and after:**

![magazine-clean-before-and-after-1]([https://github.com/danichimescu/public_Indesign/assets/56690991/109402c6-7601-46ef-a3bd-6af0cf127c8c](https://private-user-images.githubusercontent.com/56690991/309693734-109402c6-7601-46ef-a3bd-6af0cf127c8c.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTAwOTgyNDMsIm5iZiI6MTcxMDA5Nzk0MywicGF0aCI6Ii81NjY5MDk5MS8zMDk2OTM3MzQtMTA5NDAyYzYtNzYwMS00NmVmLWEzYmQtNmFmMGNmMTI3YzhjLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAzMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMzEwVDE5MTIyM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWE5OWQ2ZDFhMTc4MGU2YTRjODMzOTMxMTljYWVjYjhmYTI3MmIxNTZjM2MzOGNiMGRlYzg5YTI5ZTIzYmRlZWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.lQKOK3LgJNp5R3N8YWBFfF6CoQShU_q3j5aCwZ806ps))


# about > 02_export text from indd.jsx
1. input: clean indesign file ready to export with only description and images of product
2. output: text tab delimited with info

the script take every images and is looking for the closest text with description.
text with description is separated in 2 categories one with the name of product which has a specific style and one with other info, below of name of product

**the solution for find the match between image and his description: find the shortest distance between center of text frame with description and center of image. this center are defined by 2 variables (x and y). 
the script is calculates the Euclidean distance between two points in a two-dimensional space.**

![image](https://github.com/danichimescu/public_Indesign/assets/56690991/b6f32389-86be-43cd-8e47-c85749dc3cf2)


**the solution for check if the match of image and description is good: the script is drawing an arrow between image and description. in this way you can check very fast if the matching is correct**

![image](https://github.com/danichimescu/public_Indesign/assets/56690991/dc08cccb-bb4f-49b6-84b3-ba6fbc595861)

## at the end the excel look like this:
![image](https://github.com/danichimescu/public_Indesign/assets/56690991/3bf0b925-9f20-4ca8-97c2-cea0c4073e0b)





