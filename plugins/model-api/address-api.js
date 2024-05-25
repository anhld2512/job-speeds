export default () => {
  /**
   *  2023-08-03.
   * Get Address Partition from Raw Address.
   * @param {Object|String} fullAddress Required
   */
  const getAddressPartition = (rawAddress) => {
    let addressPartition = {};
    if (rawAddress && typeof rawAddress === "object") {
  
      addressPartition = {
        address: rawAddress.Address,
        country: rawAddress.Country || 'Việt Nam',
        province: rawAddress.ProvinceName,
        provinceCode: rawAddress.Province,
        district: rawAddress.DistrictName,
        districtCode: rawAddress.District,
        ward: rawAddress.WardName,
        wardCode: rawAddress.Ward,
        number: rawAddress.Number,
        street: rawAddress.Street,
        quarter: rawAddress.Quarter,
        apartmentName: rawAddress.ApartmentName,
        streetAddress: `${rawAddress.Number ? `${rawAddress.Number} ` : ""}${rawAddress.ApartmentName ? '' : ' '}${rawAddress.ApartmentName ? `${rawAddress.ApartmentName}` : ""}${rawAddress.ApartmentName || rawAddress.Number  ? `, ` : ''}${rawAddress.Street ? `${rawAddress.Street}` : ""}${rawAddress.Street ? `${rawAddress.Street ? `, ` : ""}` : ""}${rawAddress.Quarter ? `${rawAddress.Quarter}` : ""}${rawAddress.Quarter ? `, ` : ""}`.trim() || null
      }
    } else {
      addressPartition = {
        address: rawAddress?.length > 0 ? rawAddress : 'Việt Nam',
        country: !rawAddress ? 'Việt Nam' : rawAddress.split(',').pop().trim(),
      }
    }
    return addressPartition;
  }
  const getHRM_Address = (addressPartition) => {
    const isStreetAddressValid = addressPartition?.provinceCode
      && addressPartition?.districtCode
      && addressPartition?.wardCode;
    return {
      Country : addressPartition?.country || null,
      Province: addressPartition?.provinceCode || null,
      District: addressPartition?.districtCode || null,
      Ward: addressPartition?.wardCode || null,
      Quarter: isStreetAddressValid ? (addressPartition?.quarter || null) : null,
      Street: isStreetAddressValid ? (addressPartition?.street || null) : null,
      ApartmentName : isStreetAddressValid ? (addressPartition?.apartmentName || null) : null,
      Number: isStreetAddressValid ? (addressPartition?.number || null) : null,
    }
  }
  return {
    getAddressPartition,
    getHRM_Address
  };
};
