export default ({ appConfig, defaultStore, $moment, $filters, $_ }) => {
  //#region Data format
  /**
   *  2024-04-24.
   * Clone Candidate value to General Value.
   * @param {Object} candidate Required
   * @returns {Object} generalValue
   */
  const generalFormatValue = (candidate) => {
    if (!candidate) return null;

    return {
      id: candidate.id,
      FirstName: candidate.FirstName,
      LastName: candidate.LastName,
      FullName: candidate.FullName,
      Gender: candidate.Gender,
      Birthday: $_.cloneDeep(candidate.Birthday),
      PlaceOfBirth: candidate.PlaceOfBirth,
      Religion: candidate.Religion,
      PersonalEmail: candidate.PersonalEmail,
      CitizenIdNO: candidate.CitizenIdNO,
      CitizenIdIssuedBy: candidate.CitizenIdIssuedBy,
      CitizenIdIssuedDate: $_.cloneDeep(candidate.CitizenIdIssuedDate),
      MarriageStatus: candidate.MarriageStatus,
      MobilePhone: candidate.MobilePhone,
      IDPhotoURL: candidate.IDPhotoURL,
      PermanentAddress: candidate.PermanentAddress,
      permanentAddressPartition: $_.cloneDeep(candidate.permanentAddressPartition),
      CurrentAddress: candidate.CurrentAddress,
      currentAddressPartition: $_.cloneDeep(candidate.currentAddressPartition),
      isCurrentEqualPermanentAddress: !!candidate.isCurrentEqualPermanentAddress
    }
  }

  /**
   *  2024-04-22.
   * Format Candidate item.
   * @param {RawItem} item Required
   * @returns
   */
  const candidateFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      Birthday: !!item.Birthday ? $moment(item.Birthday).toDate() : null,
      CitizenIdIssuedDate: !!item.CitizenIdIssuedDate ? $moment(item.CitizenIdIssuedDate).toDate() : null,
      Interests: !!item.Interests ? $filters.htmlToTextArea(item.Interests) : null,
      Talents: !!item.Talents ? $filters.htmlToTextArea(item.Talents) : null,
    }
  }

  /**
   *  2024-04-24.
   * Convert Item to Candidate Input
   * @param {Object} item Required
   * @returns {CandidateInput}
   */
  const toCandidateInput = (item) => {
    let candidateInput = { ...(item || {}) };

    //Convert Date to String.
    if (candidateInput.hasOwnProperty("Birthday")) {
      candidateInput.Birthday = !!candidateInput.Birthday ?
        $moment(candidateInput.Birthday).format("YYYY-MM-DD") : null;
    }
    if (candidateInput.hasOwnProperty("CitizenIdIssuedDate")) {
      candidateInput.CitizenIdIssuedDate = !!candidateInput.CitizenIdIssuedDate ?
        $moment(candidateInput.CitizenIdIssuedDate).format("YYYY-MM-DD") : null;
    }

    //Trim String value
    if (candidateInput.hasOwnProperty("FirstName")) {
      candidateInput.FirstName = `${candidateInput.FirstName || ""}`.trim();
    }
    if (candidateInput.hasOwnProperty("LastName")) {
      candidateInput.LastName = `${candidateInput.LastName || ""}`.trim();
    }
    if (candidateInput.hasOwnProperty("PersonalEmail")) {
      candidateInput.PersonalEmail = `${candidateInput.PersonalEmail || ""}`.trim();
    }
    if (candidateInput.hasOwnProperty("CitizenIdNO")) {
      candidateInput.CitizenIdNO = `${candidateInput.CitizenIdNO || ""}`.trim();
    }
    if (candidateInput.hasOwnProperty("MobilePhone")) {
      candidateInput.MobilePhone = `${candidateInput.MobilePhone || ""}`.trim();
    }

    //Convert TextArea to HTML String
    if (candidateInput.hasOwnProperty("Interests")) {
      candidateInput.Interests = !!`${candidateInput.Interests || ""}`.trim() ?
        $filters.textAreaToHtml(candidateInput.Interests) : null;
    }
    if (candidateInput.hasOwnProperty("Talents")) {
      candidateInput.Talents = !!`${candidateInput.Talents || ""}`.trim() ?
        $filters.textAreaToHtml(candidateInput.Talents) : null;
    }

    //convert Address
    if (candidateInput.hasOwnProperty("PermanentAddress")) {
      candidateInput.PermanentAddress = candidateInput?.permanentAddressPartition?.address ?? candidateInput.PermanentAddress;
    }
    if (candidateInput.hasOwnProperty("CurrentAddress")) {
      //Set Permanent to Current if isCurrentEqualPermanentAddress = true.
      if (!!candidateInput.isCurrentEqualPermanentAddress) {
        candidateInput.CurrentAddress = candidateInput.PermanentAddress;
      } else {
        candidateInput.CurrentAddress = candidateInput?.currentAddressPartition?.address ?? candidateInput.CurrentAddress;
      }
    }

    return candidateInput;
  }

  /**
   *  2024-04-22.
   * Format ApplyJob item.
   * @param {RawItem} item Required
   * @returns
   */
  const applyJobFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      StartDate: !!item.StartDate ? $moment(item.StartDate).toDate() : null,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-24.
   * Convert Item to ApplyJob Input
   * @param {Object} item Required
   * @returns {ApplyJobInput}
   */
  const toApplyJobInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Convert Date to String.
    if (dataInput.hasOwnProperty("StartDate")) {
      dataInput.StartDate = !!dataInput.StartDate ?
        $moment(dataInput.StartDate).format("YYYY-MM-DD") : null;
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format History item.
   * @param {RawItem} item Required
   * @returns
   */
  const historyFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      FromDate: !!item.FromDate ? $moment(item.FromDate).toDate() : null,
      ToDate: !!item.ToDate ? $moment(item.ToDate).toDate() : null,
      MainDuty: !!item.MainDuty ? $filters.htmlToTextArea(item.MainDuty) : null,
      Achievement: !!item.Achievement ? $filters.htmlToTextArea(item.Achievement) : null,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-25.
   * Convert Item to History Input
   * @param {Object} item Required
   * @returns {HistoryInput}
   */
  const toHistoryInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Convert Date to String.
    if (dataInput.hasOwnProperty("FromDate")) {
      dataInput.FromDate = !!dataInput.FromDate ?
        $moment(dataInput.FromDate).format("YYYY-MM-DD") : null;
    }
    if (dataInput.hasOwnProperty("ToDate")) {
      dataInput.ToDate = !!dataInput.ToDate ?
        $moment(dataInput.ToDate).format("YYYY-MM-DD") : null;
    }

    //Trim String value
    if (dataInput.hasOwnProperty("CompanyName")) {
      dataInput.CompanyName = `${dataInput.CompanyName || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("JobTitle")) {
      dataInput.JobTitle = `${dataInput.JobTitle || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("CompanySize")) {
      dataInput.CompanySize = `${dataInput.CompanySize || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("BusinessCategory")) {
      dataInput.BusinessCategory = `${dataInput.BusinessCategory || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("ReasonForLeave")) {
      dataInput.ReasonForLeave = `${dataInput.ReasonForLeave || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("ReferencePerson")) {
      dataInput.ReferencePerson = `${dataInput.ReferencePerson || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("RPJobTitle")) {
      dataInput.RPJobTitle = `${dataInput.RPJobTitle || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("RPMobilePhone")) {
      dataInput.RPMobilePhone = `${dataInput.RPMobilePhone || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("RPEmail")) {
      dataInput.RPEmail = `${dataInput.RPEmail || ""}`.trim();
    }

    //Convert TextArea to HTML String
    if (dataInput.hasOwnProperty("MainDuty")) {
      dataInput.MainDuty = !!`${dataInput.MainDuty || ""}`.trim() ?
        $filters.textAreaToHtml(dataInput.MainDuty) : null;
    }
    if (dataInput.hasOwnProperty("Achievement")) {
      dataInput.Achievement = !!`${dataInput.Achievement || ""}`.trim() ?
        $filters.textAreaToHtml(dataInput.Achievement) : null;
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format Certificate item.
   * @param {RawItem} item Required
   * @returns
   */
  const certificateFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      IssuedDate: !!item.IssuedDate ? $moment(item.IssuedDate).toDate() : null,
      ExpiredDate: !!item.ExpiredDate ? $moment(item.ExpiredDate).toDate() : null,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-25.
   * Convert Item to Certificate Input
   * @param {Object} item Required
   * @returns {CertificateInput}
   */
  const toCertificateInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Convert Date to String.
    if (dataInput.hasOwnProperty("IssuedDate")) {
      dataInput.IssuedDate = !!dataInput.IssuedDate ?
        $moment(dataInput.IssuedDate).format("YYYY-MM-DD") : null;
    }
    if (dataInput.hasOwnProperty("ExpiredDate")) {
      dataInput.ExpiredDate = !!dataInput.ExpiredDate ?
        $moment(dataInput.ExpiredDate).format("YYYY-MM-DD") : null;
    }

    //Trim String value
    if (dataInput.hasOwnProperty("CertificateName")) {
      dataInput.CertificateName = `${dataInput.CertificateName || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("TrainingPlace")) {
      dataInput.TrainingPlace = `${dataInput.TrainingPlace || ""}`.trim();
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format ForeignLanguage item.
   * @param {RawItem} item Required
   * @returns
   */
  const foreignLanguageFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-25.
   * Convert Item to ForeignLanguage Input
   * @param {Object} item Required
   * @returns {ForeignLanguageInput}
   */
  const toForeignLanguageInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Trim String value
    if (dataInput.hasOwnProperty("LanguageName")) {
      dataInput.LanguageName = `${dataInput.LanguageName || ""}`.trim();
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format SoftwareSkill item.
   * @param {RawItem} item Required
   * @returns
   */
  const softwareSkillFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-25.
   * Convert Item to SoftwareSkill Input
   * @param {Object} item Required
   * @returns {SoftwareSkillInput}
   */
  const toSoftwareSkillInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Trim String value
    if (dataInput.hasOwnProperty("Name")) {
      dataInput.Name = `${dataInput.Name || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("TrainingPlace")) {
      dataInput.TrainingPlace = `${dataInput.TrainingPlace || ""}`.trim();
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format OtherSkill item.
   * @param {RawItem} item Required
   * @returns
   */
  const otherSkillFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-26.
   * Convert Item to OtherSkill Input
   * @param {Object} item Required
   * @returns {OtherSkillInput}
   */
  const toOtherSkillInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Trim String value
    if (dataInput.hasOwnProperty("Name")) {
      dataInput.Name = `${dataInput.Name || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("TrainingPlace")) {
      dataInput.TrainingPlace = `${dataInput.TrainingPlace || ""}`.trim();
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format Relative item.
   * @param {RawItem} item Required
   * @returns
   */
  const relativeFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      Birthday: !!item.Birthday ? $moment(item.Birthday).toDate() : null,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-24.
   * Convert Item to Relative Input
   * @param {Object} item Required
   * @returns {RelativeInput}
   */
  const toRelativeInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Convert Date to String.
    if (dataInput.hasOwnProperty("Birthday")) {
      dataInput.Birthday = !!dataInput.Birthday ?
        $moment(dataInput.Birthday).format("YYYY-MM-DD") : null;
    }

    //Trim String value
    if (dataInput.hasOwnProperty("FirstName")) {
      dataInput.FirstName = `${dataInput.FirstName || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("LastName")) {
      dataInput.LastName = `${dataInput.LastName || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("HomePhone")) {
      dataInput.HomePhone = `${dataInput.HomePhone || ""}`.trim();
    }

    //convert Address
    if (dataInput.hasOwnProperty("HomeAddress")) {
      dataInput.HomeAddress = dataInput?.homeAddressPartition?.address ?? dataInput.HomeAddress;
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format Activity item.
   * @param {RawItem} item Required
   * @returns
   */
  const activityFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      FromDate: !!item.FromDate ? $moment(item.FromDate).toDate() : null,
      ToDate: !!item.ToDate ? $moment(item.ToDate).toDate() : null,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-24.
   * Convert Item to Activity Input
   * @param {Object} item Required
   * @returns {ActivityInput}
   */
  const toActivityInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Convert Date to String.
    if (dataInput.hasOwnProperty("FromDate")) {
      dataInput.FromDate = !!dataInput.FromDate ?
        $moment(dataInput.FromDate).format("YYYY-MM-DD") : null;
    }
    if (dataInput.hasOwnProperty("ToDate")) {
      dataInput.ToDate = !!dataInput.ToDate ?
        $moment(dataInput.ToDate).format("YYYY-MM-DD") : null;
    }

    //Trim String value
    if (dataInput.hasOwnProperty("Name")) {
      dataInput.Name = `${dataInput.Name || ""}`.trim();
    }

    //Convert TextArea to HTML String
    if (dataInput.hasOwnProperty("Duty")) {
      dataInput.Duty = !!`${dataInput.Duty || ""}`.trim() ?
        $filters.textAreaToHtml(dataInput.Duty) : null;
    }

    return dataInput;
  }

  /**
   *  2024-04-22.
   * Format Attachment item.
   * @param {RawItem} item Required
   * @returns
   */
  const attachmentFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-04-22.
   * Format SocialNetwork item.
   * @param {RawItem} item Required
   * @returns
   */
  const socialNetworkFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === 'object')) return null;

    return {
      ...item,
      date_created: !!item.date_created ? $moment(item.date_created).toDate() : null,
      date_updated: !!item.date_updated ? $moment(item.date_updated).toDate() : null,
    }
  }

  /**
   *  2024-05-02.
   * Convert Item to SocialNetwork Input
   * @param {Object} item Required
   * @returns {ActivityInput}
   */
  const toSocialNetworkInput = (item) => {
    let dataInput = { ...(item || {}) };

    //Trim String value
    if (dataInput.hasOwnProperty("Name")) {
      dataInput.Name = `${dataInput.Name || ""}`.trim();
    }
    if (dataInput.hasOwnProperty("Value")) {
      dataInput.Value = `${dataInput.Value || ""}`.trim();
    }

    return dataInput;
  }
  //#endregion

  //#region Query
  /**
   *  2024-05-06.
   * Kiểm tra Candidate đã tồn tại trong hệ thống nay chưa.
   * @param {Object} uniqueKey Required
   * @param {String} uniqueKey.value Required
   * @param {String} uniqueKey.field Required
   * @param {Object} option Optional
   * @returns
   */
  const checkExistCandidate = async (uniqueKey, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: uniqueKey,
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/candidate/check-exist`, fetchOption);
  };

  /**
   *  2024-04-17.
   * Get Candidate Info by Id.
   * @param {String} id - Required
   * @param {Object} option - Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const getCandidateById = async (id, option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: 'GET',
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/candidate/${id}`, fetchOption);
  }
  //#endregion

  //#region Mutation
  /**
   *  2024-04-24.
   * Upsert Candidate.
   * @param {Object} data Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const upsertCandidate = async (data, option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: 'POST',
      body: data,
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/candidate/upsert`, fetchOption);
  }

  /**
   *  2024-05-06.
   * Upload IDPhoto.
   * @param {File} image Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const uploadIDPhoto = async (image, option = {}) => {
    const formData = new FormData();
    formData.append("image", image)

    const fetchOption = {
      ...option,
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/candidate/upload-id-photo`, fetchOption);
  }

  /**
   *  2024-04-29.
   * Upload Attachment.
   * @param {Array<File>} files Required
   * @param {Object} option Optional
   * @returns {Array<Attachment>} attachments
   */
  const uploadAttachment = async (files, option = {}) => {
    const formData = new FormData();
    files.forEach(element => { formData.append("files", element) });
    const fetchOption = {
      ...option,
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/candidate/attachment/upload`, fetchOption);
  }

  /**
   *  2024-04-25.
   * Delete ApplyJob.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteApplyJob = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/apply-job/delete`, fetchOption);
  };

  /**
   *  2024-04-25.
   * Delete History.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteHistory = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id, },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/history/delete`, fetchOption);
  };

  /**
   *  2024-04-25.
   * Delete Certificate.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteCertificate = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/certificate/delete`, fetchOption);
  };

  /**
   *  2024-04-25.
   * Delete ForeignLanguage.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteForeignLanguage = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/foreign-language/delete`, fetchOption);
  };

  /**
   *  2024-04-26.
   * Delete SoftwareSkill.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteSoftwareSkill = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/software-skill/delete`, fetchOption);
  };

  /**
   *  2024-04-26.
   * Delete OtherSkill.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteOtherSkill = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/other-skill/delete`, fetchOption);
  };

  /**
   *  2024-04-26.
   * Delete Relative.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteRelative = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/relative/delete`, fetchOption);
  };

  /**
   *  2024-04-29.
   * Delete Activity.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteActivity = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/activity/delete`, fetchOption);
  };

  /**
   *  2024-05-02
   * Delete SocialNetwork.
   * @param {String} id Required
   * @param {Object} option Optional
   * @returns {Promise<AsyncData<DataT>>}
   */
  const deleteSocialNetwork = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "POST",
      body: { id: id },
      headers: {
        Authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`
      }
    };
    return await useFetch(`${appConfig.apiURL.rctg}/social-network/delete`, fetchOption);
  };
  //#endregion

  return {
    generalFormatValue,
    candidateFormat, toCandidateInput,
    applyJobFormat, toApplyJobInput,
    historyFormat, toHistoryInput,
    certificateFormat, toCertificateInput,
    foreignLanguageFormat, toForeignLanguageInput,
    softwareSkillFormat, toSoftwareSkillInput,
    otherSkillFormat, toOtherSkillInput,
    relativeFormat, toRelativeInput,
    activityFormat, toActivityInput,
    socialNetworkFormat, toSocialNetworkInput,
    attachmentFormat,
    checkExistCandidate,
    getCandidateById,
    upsertCandidate,
    uploadIDPhoto,
    uploadAttachment,
    deleteApplyJob,
    deleteHistory,
    deleteCertificate,
    deleteForeignLanguage,
    deleteSoftwareSkill,
    deleteOtherSkill,
    deleteRelative,
    deleteActivity,
    deleteSocialNetwork
  };
};
