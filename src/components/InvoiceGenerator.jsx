import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../../firebase";
import InvoicePreview from "./InvoicePreview";

const InvoiceGenerator = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [allError, setAllError] = useState(false);
  const [itemError, setItemError] = useState(false);

  const [logoUrl, setLogoUrl] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [uplodingNow, setUploadingNow] = useState("");

  const [images, setImages] = useState({});

  const [sellerDetails, setSellerDetails] = useState({});
  const [billingDetails, setBillingDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [reverseCharge, setReverseCharge] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [allItems, setAllItems] = useState([]);

  const handleAddItem = () => {
    const allItems = Object.keys(currentItem);
    if (allItems.length < 5) {
      setItemError("Please fill all itemDetails");
      return;
    }
    for (const item in currentItem) {
      if (currentItem[item].trim().length === 0) {
        setItemError(`${item} cannot be empty`);
        return;
      }
    }
    setAllItems((prevItems) => [...prevItems, currentItem]);
  };
  useEffect(() => {
    const imageUpload = (file, type) => {
      setUploadingNow(type);
      setLoading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadPercentage(Math.round(progress));
        },
        () => {
          setLoading(false);
          setUploadingNow("");
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImages({ ...images, [type]: downloadURL });
            setLoading(false);
            setUploadingNow("");
          });
        }
      );
    };
    if (logoUrl) {
      imageUpload(logoUrl, "logo");
    }
    if (signatureUrl) {
      imageUpload(signatureUrl, "signature");
    }
  }, [logoUrl, signatureUrl]);

  const sellerItemChangeHandler = (e) => {
    setAllError(false);
    setSellerDetails({ ...sellerDetails, [e.target.name]: e.target.value });
  };
  const BillingItemChangeHandler = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };
  const orderDetailsChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };
  const invoiceDetailsChange = (e) => {
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };
  const currentItemChange = (e) => {
    setItemError(false);
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const openPreview = () => {
    const allSellingData = Object.keys(sellerDetails);
    if (allSellingData.length < 8) {
      setAllError("Please fillup selling details");
      return;
    }
    for (const selling in sellerDetails) {
      if (sellerDetails[selling].trim().length === 0) {
        setAllError(`${selling} cannot be empty`);
        return;
      }
    }
    const allBillingData = Object.keys(billingDetails);
    if (allBillingData.length < 7) {
      setAllError("Please fillup billing details");
      return;
    }
    for (const billing in billingDetails) {
      if (billingDetails[billing].trim().length === 0) {
        setAllError(`${billing} cannot be empty`);
        return;
      }
    }
    const allOrderDetails = Object.keys(orderDetails);
    if (allOrderDetails.length < 2) {
      setAllError("Please fillup order details");
      return;
    }
    for (const order in orderDetails) {
      if (orderDetails[order].trim().length === 0) {
        setAllError(`${order} cannot be empty`);
        return;
      }
    }
    const allInvoiceDetails = Object.keys(invoiceDetails);
    if (allInvoiceDetails.length < 3) {
      setAllError("Please fillup invoice details");
      return;
    }
    for (const inv in invoiceDetails) {
      if (invoiceDetails[inv].trim().length === 0) {
        setAllError(`${inv} cannot be empty`);
        return;
      }
    }
    if (allItems.length === 0) {
      setAllError("No Item added");
      return;
    }
    const allImages = Object.keys(images);

    if (allImages.length < 2) {
      setAllError("Please upload Both Images");
      return;
    }
    setPreviewOpen(true);
  };

  console.log(previewOpen);
  return (
    <section className="flex flex-col gap-4 m-5">
      {/* Logo and Title */}
      <div>
        <input
          type="file"
          id="logo_image"
          accept="image/*"
          placeholder="Company Logo"
          onChange={(e) => setLogoUrl(e.target.files[0])}
          hidden
        />
        <img
          className={`${images.logo ? "w-96 h-16 mb-5" : ""}`}
          src={images.logo ? images.logo : ""}
          alt=""
        />
        {uplodingNow === "logo" && (
          <p className="text-lg my-4">
            {fileUploadError ? fileUploadError : fileUploadPercentage}%
          </p>
        )}
        <label
          htmlFor={`${loading ? "" : "logo_image"}`}
          className={`${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600  cursor-pointer"
          } p-2  rounded-lg text-white font-bold hover:opacity-80`}
        >
          Select Company Logo
        </label>
      </div>
      {/* Seller Details Form */}
      <div className="flex flex-col gap-3 w-[80%] mx-auto">
        <h2>Seller Details</h2>
        <input
          type="text"
          placeholder="Name"
          className="py-1 px-3 rounded-md"
          name="name"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="text"
          placeholder="Address"
          className="py-1 px-3 rounded-md"
          name="address"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="text"
          placeholder="City"
          className="py-1 px-3 rounded-md"
          name="city"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="text"
          placeholder="State"
          className="py-1 px-3 rounded-md"
          name="state"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="number"
          min={0}
          placeholder="Pincode"
          className="py-1 px-3 rounded-md"
          name="pincode"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="text"
          placeholder="Country"
          className="py-1 px-3 rounded-md"
          name="country"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="number"
          min={0}
          placeholder="PAN No."
          className="py-1 px-3 rounded-md"
          name="pan"
          onChange={sellerItemChangeHandler}
        />
        <input
          type="number"
          min={0}
          placeholder="GST Registration No."
          className="py-1 px-3 rounded-md"
          name="gst"
          onChange={sellerItemChangeHandler}
        />
      </div>

      {/* Billing Details Form */}
      <div className="flex flex-col gap-3 w-[80%] mx-auto">
        <h2>Billing Details</h2>
        <input
          type="text"
          placeholder="Name"
          className="py-1 px-3 rounded-md"
          name="name"
          onChange={BillingItemChangeHandler}
        />
        <input
          type="text"
          placeholder="Address"
          className="py-1 px-3 rounded-md"
          name="address"
          onChange={BillingItemChangeHandler}
        />
        <input
          type="text"
          placeholder="City"
          className="py-1 px-3 rounded-md"
          name="city"
          onChange={BillingItemChangeHandler}
        />
        <input
          type="text"
          placeholder="State"
          className="py-1 px-3 rounded-md"
          name="state"
          onChange={BillingItemChangeHandler}
        />
        <input
          type="number"
          min={0}
          placeholder="Pincode"
          className="py-1 px-3 rounded-md"
          name="pincode"
          onChange={BillingItemChangeHandler}
        />
        <input
          type="text"
          placeholder="Country"
          className="py-1 px-3 rounded-md"
          name="country"
          onChange={BillingItemChangeHandler}
        />
        <input
          type="number"
          min={0}
          placeholder="State/UT Code"
          className="py-1 px-3 rounded-md"
          name="stateCode"
          onChange={BillingItemChangeHandler}
        />
      </div>

      {/* Order Details Form */}
      <div className="flex flex-col gap-3 w-[80%] mx-auto">
        <h2>Order Details</h2>
        <input
          type="number"
          min={0}
          placeholder="Order No."
          className="py-1 px-3 rounded-md"
          name="orderNo"
          onChange={orderDetailsChange}
        />
        <input
          type="date"
          placeholder="Order Date"
          className="py-1 px-3 rounded-md"
          name="orderDate"
          onChange={orderDetailsChange}
        />
      </div>

      {/* Invoice Details Form */}
      <div className="flex flex-col gap-3 w-[80%] mx-auto">
        <h2>Invoice Details</h2>
        <input
          type="number"
          min={0}
          placeholder="Invoice No."
          className="py-1 px-3 rounded-md"
          name="invoiceNo"
          onChange={invoiceDetailsChange}
        />
        <input
          type="text"
          placeholder="Invoice Details"
          className="py-1 px-3 rounded-md"
          name="invoiceDetails"
          onChange={invoiceDetailsChange}
        />
        <input
          type="date"
          placeholder="Invoice Date"
          className="py-1 px-3 rounded-md"
          name="invoiceDate"
          onChange={invoiceDetailsChange}
        />
      </div>

      {/* Reverse Charge Checkbox */}
      <div className="w-[80%] mx-auto">
        <h2>Reverse Charge</h2>
        <input
          type="checkbox"
          checked={reverseCharge}
          onChange={(e) => setReverseCharge(e.target.checked)}
        />{" "}
        Yes/No
      </div>

      {/* Item Details Form */}
      <div className="text-right w-[80%] mx-auto">
        <h2 className="text-left mb-3">Item Details</h2>
        <div className="flex flex-col mb-6 gap-3">
          <input
            type="text"
            placeholder="Description"
            className="py-1 px-3 rounded-md"
            value={currentItem.description || ""}
            name="description"
            onChange={currentItemChange}
          />
          <input
            type="number"
            placeholder="Unit Price"
            className="py-1 px-3 rounded-md"
            min={0}
            value={currentItem.unitPrice || ""}
            name="unitPrice"
            onChange={currentItemChange}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="py-1 px-3 rounded-md"
            min={0}
            value={currentItem.quantity || ""}
            name="quantity"
            onChange={currentItemChange}
          />
          <input
            type="number"
            placeholder="Discount"
            className="py-1 px-3 rounded-md"
            value={currentItem.discount || ""}
            min={0}
            name="discount"
            onChange={currentItemChange}
          />
          <input
            type="number"
            placeholder="Tax Rate"
            className="py-1 px-3 rounded-md"
            value={currentItem.taxRate || ""}
            name="taxRate"
            onChange={currentItemChange}
            min={0}
          />
        </div>
        {itemError && (
          <p className="text-red-500 font-bold text-lg mb-2">{itemError}</p>
        )}

        <button
          className="bg-blue-600 p-2 cursor-pointer rounded-lg text-white font-bold hover:opacity-80"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>

      {/* Display Item List */}
      <div className="flex flex-col gap-3 w-[80%] mx-auto">
        <h1 className="text-lg">Items</h1>
        <ul>
          {allItems.length > 0 ? (
            allItems.map((item, index) => (
              <li key={index}>
                {item.description} - {item.unitPrice} - {item.quantity} -{" "}
                {item.discount} - {item.taxRate}%
              </li>
            ))
          ) : (
            <p className="text-sm">No items added</p>
          )}
        </ul>
      </div>
      {/* Seller Signature */}
      <div>
        <input
          type="file"
          id="signature"
          accept="image/*"
          placeholder="seller signature"
          onChange={(e) => setSignatureUrl(e.target.files[0])}
          hidden
        />
        <img
          className={`${images.signature ? "w-96 h-16 mb-5" : ""}`}
          src={images.signature ? images.signature : ""}
          alt=""
        />
        {uplodingNow === "signature" && (
          <p className="text-lg my-4">
            {fileUploadError ? fileUploadError : fileUploadPercentage}%
          </p>
        )}
        <label
          htmlFor={`${loading ? "" : "signature"}`}
          className={`${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600  cursor-pointer"
          } p-2 rounded-lg text-white font-bold hover:opacity-80`}
        >
          Select Signature
        </label>
      </div>
      {previewOpen && (
        <div style={{ textAlign: "center" }}>
          <InvoicePreview
            sellerDetails={sellerDetails}
            billingDetails={billingDetails}
            orderDetails={orderDetails}
            invoiceDetails={invoiceDetails}
            allItems={allItems}
            reverseCharge={reverseCharge}
            images={images}
            previewOpen={previewOpen}
          />
        </div>
      )}
      {/* Preview Button */}
      <div className="text-center">
        {allError && (
          <p className="text-red-500 font-bold text-lg mb-2">{allError}</p>
        )}
        <button
          disabled={loading}
          onClick={openPreview}
          className="bg-blue-600 p-2 cursor-pointer rounded-lg text-white font-bold hover:opacity-80 disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Preview
        </button>
      </div>
    </section>
  );
};

export default InvoiceGenerator;
