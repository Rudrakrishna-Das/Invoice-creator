# InvoicePreview and Invoice Generator Documentation:

- The InvoiceGenerator component is a React functional component.
- It utilizes state hooks such as useState to manage component state.
- Firebase's getDownloadURL, getStorage, ref, and uploadBytesResumable functions are imported from "firebase/storage".
- The app object is imported from firebase to initialize Firebase.
- The component renders a form for generating an invoice, including seller details, billing details, order details, invoice details, and item details.
- It allows users to upload a company logo and seller signature images, which are stored in Firebase Storage.
- The component dynamically updates the UI to show upload progress for images.
- Users can add multiple items to the invoice, with validation for required fields.
- Once all required data is filled, users can preview the invoice.
- This component utilizes Chakra UI components for modal styling and layout.
- It uses React hooks such as `useRef` and `useDisclosure` for managing modal state.
- The component receives various props including `sellerDetails`, `billingDetails`, `orderDetails`, `invoiceDetails`, `allItems`, `reverseCharge`, and `images` to render the invoice content dynamically.
- Also used ReactToPrint for download invoice as a pdf

# Usage:

- npm install in terminal
- npm run
- Go to your browser
- Fill all details and upload images
- Click on Preview
- a Button will appear saying 'Click here to see the preview of Invoice'
- click the button you will see the preview and you can download it from the button Print/Download
