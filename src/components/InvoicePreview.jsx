import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Flex,
} from "@chakra-ui/react";

import { useRef } from "react";
import ReactToPrint from "react-to-print";
const InvoicePreview = ({
  previewOpen,
  sellerDetails,
  billingDetails,
  orderDetails,
  invoiceDetails,
  allItems,
  reverseCharge,
  images,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const invoiceRef = useRef();
  const shippingCharges = 30.96;
  let totalTax = 0;
  let totalAmount = 0;
  const numberToWords = (num) => {
    const belowTwenty = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    if (num === 0) return "zero";

    const getBelowHundred = (n) => {
      if (n < 20) return belowTwenty[n];
      return (
        tens[Math.floor(n / 10)] + (n % 10 ? " " + belowTwenty[n % 10] : "")
      );
    };

    const getBelowThousand = (n) => {
      if (n < 100) return getBelowHundred(n);
      return (
        belowTwenty[Math.floor(n / 100)] +
        " hundred" +
        (n % 100 ? " " + getBelowHundred(n % 100) : "")
      );
    };

    let words = "";
    let thousands = Math.floor(num / 1000);
    let hundreds = num % 1000;

    if (thousands > 0) {
      words += getBelowThousand(thousands) + " thousand";
    }

    if (hundreds > 0) {
      words += (words ? " " : "") + getBelowThousand(hundreds);
    }

    return words.trim();
  };

  return (
    <>
      <Button w="20rem" onClick={onOpen}>
        Click here to see the preview of Invoice
      </Button>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg="white" color="black">
            <section className="m-5" ref={invoiceRef}>
              <Flex align="center" justifyContent="space-between">
                <img
                  className="w-48 h-24"
                  src={images.logo}
                  alt="company logo"
                />
                <div>
                  <h1 className="font-bold">
                    Tax Invoice/Bill of Supply/Cash Memo
                  </h1>
                  <p className="text-right">(Original for Recipient)</p>
                </div>
              </Flex>
              <Flex justifyContent="space-between">
                <Box>
                  <Box>
                    <h1 className="font-bold">Sold by:</h1>
                    <p>{sellerDetails.name}</p>
                    <p>{sellerDetails.address}</p>
                    <p>
                      {sellerDetails.city.toUpperCase()}
                      {", "}
                      {sellerDetails.state.toUpperCase()} {", "}
                      {sellerDetails.pincode}
                    </p>
                    <p>{sellerDetails.country.slice(0, 2).toUpperCase()}</p>
                  </Box>
                  <Flex marginTop="40px">
                    <h1 className="font-bold">PAN No.</h1>
                    <p className="ml-2">{sellerDetails.pan}</p>
                  </Flex>
                  <Flex>
                    <h1 className="font-bold">GST Registration No.</h1>
                    <p className="ml-2">{sellerDetails.gst}</p>
                  </Flex>
                </Box>
                <Box textAlign="right">
                  <Box>
                    <h1 className="font-bold">Billing Address:</h1>
                    <p>{billingDetails.name}</p>
                    <p>{billingDetails.address}</p>
                    <p>
                      {billingDetails.city.toUpperCase()}
                      {", "}
                      {billingDetails.state.toUpperCase()} {", "}
                      {billingDetails.pincode}
                    </p>
                    <p>{billingDetails.country.slice(0, 2).toUpperCase()}</p>
                  </Box>
                  <Flex justifyContent="flex-end">
                    <h1 className="font-bold">State/UT Code:</h1>
                    <p className="ml-2">{sellerDetails.pan}</p>
                  </Flex>
                </Box>
              </Flex>
              <Flex align="flex-end" justifyContent="space-between">
                <Box>
                  <Flex>
                    <h1 className="font-bold">Order Number:</h1>
                    <p className="ml-2">{orderDetails.orderNo}</p>
                  </Flex>
                  <Flex>
                    <h1 className="font-bold">Order Date:</h1>
                    <p className="ml-2">
                      {orderDetails.orderDate.split("-").reverse().join(".")}
                    </p>
                  </Flex>
                </Box>
                <Box textAlign="right">
                  <h1 className="font-bold">Shipping Address:</h1>
                  <p>{sellerDetails.name}</p>
                  <p>{sellerDetails.name}</p>
                  <p>{sellerDetails.address}</p>
                  <p>
                    {sellerDetails.city.toUpperCase()}
                    {", "}
                    {sellerDetails.state.toUpperCase()} {", "}
                    {sellerDetails.pincode}
                  </p>
                  <p>{sellerDetails.country.slice(0, 2).toUpperCase()}</p>
                  <Flex justifyContent="flex-end">
                    <h1 className="font-bold">Place of supply:</h1>
                    <p className="ml-2">{sellerDetails.state}</p>
                  </Flex>
                  <Flex justifyContent="flex-end">
                    <h1 className="font-bold">Place of delivery:</h1>
                    <p className="ml-2">{billingDetails.state}</p>
                  </Flex>
                  <Flex justifyContent="flex-end">
                    <h1 className="font-bold">Invoice Number:</h1>
                    <p className="ml-2">{invoiceDetails.invoiceNo}</p>
                  </Flex>
                  <Flex justifyContent="flex-end">
                    <h1 className="font-bold">Invoice Details:</h1>
                    <p className="ml-2">{invoiceDetails.invoiceDetails}</p>
                  </Flex>
                  <Flex justifyContent="flex-end">
                    <h1 className="font-bold">Invoice Date:</h1>
                    <p className="ml-2">
                      {invoiceDetails.invoiceDate
                        .split("-")
                        .reverse()
                        .join(".")}
                    </p>
                  </Flex>
                </Box>
              </Flex>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-2 bg-slate-400 border-2 border-black p-1">
                      sl No.
                    </th>
                    <th className="w-56 bg-slate-400 border-2 border-black p-1">
                      Description
                    </th>
                    <th className="w-2 bg-slate-400 border-2 border-black p-1">
                      Unit price
                    </th>
                    <th className="w-2 bg-slate-400 border-2 border-black p-1">
                      Qty
                    </th>
                    <th className="w-2 bg-slate-400 border-2 border-black p-1">
                      Net Amount
                    </th>
                    <th className="w-2 bg-slate-400 border-2 border-black p-1">
                      Tax Rate
                    </th>
                    <th className="w-2 bg-slate-400 border-2 border-black p-1">
                      Tax Type
                    </th>
                    <th className="w-24 bg-slate-400 border-2 border-black p-1">
                      Tax Amount
                    </th>
                    <th className="w-24 bg-slate-400 border-2 border-black p-1">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allItems.map((item, index) => (
                    <tr key={index}>
                      {/* SL NO */}
                      <td className="border-2 border-black p-1">
                        <>
                          {index + 1}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          {}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </>
                      </td>
                      {/* Description */}
                      <td className="border-2 border-black p-1">
                        <>
                          {item.description}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          Shipping Charges
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </>
                      </td>
                      {/* unit Price */}
                      <td className="border-2 border-black p-1">
                        <>
                          ₹{item.unitPrice}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />₹{shippingCharges}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </>
                      </td>
                      {/* Quantity */}
                      <td className="border-2 border-black p-1">
                        <>
                          {item.quantity}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          {}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </>
                      </td>
                      {/* Net Amount */}
                      <td className="border-2 border-black p-1">
                        <>
                          {+item.unitPrice * +item.quantity -
                            (item.discount.lenght === 0 ? 0 : +item.discount)}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          {shippingCharges}
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </>
                      </td>
                      {/* Tax Rate */}
                      <td className="border-2 border-black p-1">
                        {sellerDetails.state === billingDetails.state ? (
                          <>
                            {item.taxRate / 2}% <br /> {item.taxRate / 2}%
                            <br />
                            <br />
                            <br />
                            <br />
                            {item.taxRate / 2}% <br /> {item.taxRate / 2}%
                            <br />
                            <br />
                            <br />
                            <br />
                          </>
                        ) : (
                          <>
                            {item.taxRate}%
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            {item.taxRate}%
                            <br />
                            <br />
                            <br />
                            <br />
                          </>
                        )}
                      </td>
                      {/* Tax Type */}
                      <td className="border-2  border-black p-1 ">
                        {sellerDetails.state === billingDetails.state ? (
                          <>
                            CGST <br /> SGST
                            <br />
                            <br />
                            <br />
                            <br />
                            CGST <br /> SGST
                            <br />
                            <br />
                            <br />
                            <br />
                          </>
                        ) : (
                          <>
                            IGST
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            IGST
                            <br />
                            <br />
                            <br />
                            <br />
                          </>
                        )}
                      </td>
                      {/* Tax Amount */}
                      <td className="border-2 border-black p-1">
                        {sellerDetails.state === billingDetails.state ? (
                          <>
                            <p className="hidden">
                              {
                                (totalTax +=
                                  (+item.unitPrice *
                                    +item.quantity *
                                    (+item.taxRate / 2)) /
                                  100)
                              }
                              {
                                (totalTax +=
                                  (+shippingCharges * (+item.taxRate / 2)) /
                                  100)
                              }
                            </p>
                            ₹
                            {(
                              (+item.unitPrice *
                                +item.quantity *
                                (+item.taxRate / 2)) /
                              100
                            ).toFixed(2)}
                            {}
                            <br />
                            <p className="hidden">
                              {" "}
                              {
                                (totalTax +=
                                  (+item.unitPrice *
                                    +item.quantity *
                                    (+item.taxRate / 2)) /
                                  100)
                              }
                            </p>
                            ₹
                            {(
                              (+item.unitPrice *
                                +item.quantity *
                                (+item.taxRate / 2)) /
                              100
                            ).toFixed(2)}
                            <br />
                            <br />
                            <br />
                            <br />₹
                            {(
                              (+shippingCharges * (+item.taxRate / 2)) /
                              100
                            ).toFixed(2)}
                            <br />₹
                            {(
                              (+shippingCharges * (+item.taxRate / 2)) /
                              100
                            ).toFixed(2)}
                            <br />
                            <br />
                            <br />
                            <br />
                          </>
                        ) : (
                          <>
                            <p hidden>
                              {
                                (totalTax +=
                                  (+item.unitPrice *
                                    +item.quantity *
                                    +item.taxRate) /
                                  100)
                              }
                              {
                                (totalTax +=
                                  (+shippingCharges * +item.taxRate) / 100)
                              }
                            </p>
                            ₹
                            {(
                              (+item.unitPrice *
                                +item.quantity *
                                +item.taxRate) /
                              100
                            ).toFixed(2)}
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />₹
                            {((+shippingCharges * +item.taxRate) / 100).toFixed(
                              2
                            )}
                            <br />
                            <br />
                            <br />
                            <br />
                          </>
                        )}
                      </td>
                      {/* Total Amount */}

                      <td className="border-2 border-black p-1">
                        <p hidden>
                          {
                            (totalAmount +=
                              +item.unitPrice * +item.quantity +
                              (+item.unitPrice *
                                +item.quantity *
                                item.taxRate) /
                                100)
                          }
                          {
                            (totalAmount +=
                              +shippingCharges * +item.quantity +
                              (+shippingCharges * item.taxRate) / 100)
                          }
                        </p>
                        ₹
                        {(
                          +item.unitPrice * +item.quantity +
                          (+item.unitPrice * +item.quantity * item.taxRate) /
                            100
                        ).toFixed(2)}
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />₹
                        {(
                          +shippingCharges * +item.quantity +
                          (+shippingCharges * item.taxRate) / 100
                        ).toFixed(2)}
                        <br />
                        <br />
                        <br />
                        <br />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th className="border-y-2 border-l-2 border-black">
                      Total
                    </th>
                    <th className="border-y-2 border-black"></th>
                    <th className="border-y-2 border-black"></th>
                    <th className="border-y-2 border-black"></th>
                    <th className="border-y-2 border-black"></th>
                    <th className="border-y-2 border-black"></th>
                    <th className="border-y-2 border-black"></th>
                    <td className="border-2 border-black ">
                      ₹ {totalTax.toFixed(2)}
                    </td>
                    <td className="border-2 border-black">
                      ₹ {totalAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-2 border-black">
                    <td colSpan="7">
                      <h1 className="font-extrabold">Amount in Words:</h1>
                      <p className="font-extrabold">
                        {numberToWords(totalAmount.toFixed(0))}
                      </p>
                    </td>
                  </tr>
                  <tr className="border-2 border-black">
                    <td rowSpan="8" colSpan="10" className="text-right">
                      <h1 className="font-bold">For {sellerDetails.name}:</h1>
                      <img
                        src={images.signature}
                        alt=""
                        className="w-28 float-right"
                      />
                      <br />
                      <br />
                      <h1 className="font-bold">Authorized Signature</h1>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm">
                Wheather tax is payable under reverse charge -{" "}
                {reverseCharge ? "Yes" : "No"}
              </p>
            </section>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <ReactToPrint
              trigger={() => <Button>Print/Download Invoice</Button>}
              content={() => invoiceRef.current}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvoicePreview;
