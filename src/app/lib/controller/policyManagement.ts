import policy from "../models/policyschema"
import User from "../models/userschema";

export const getAllpolicies = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }

    const PoliciesData = await policy.find();

    if (!PoliciesData || PoliciesData.length == 0) {
        return { status: 404, message: "Policy Details Not Found", error: true }
    }
    const FilteredPolicyData = PoliciesData?.map(({ _id, name, description, category, limitAmount, effectiveDate, expiryDate, currency, createdAt }) => {
        let CreatedAt = null
        if (createdAt) {
            const createdAttoString = createdAt.toISOString();
            const year = createdAttoString.slice(0, 4)
            const month = createdAttoString.slice(5, 7)
            const day = createdAttoString.slice(8, 10);
            CreatedAt = `${day}/${month}/${year}`;
        }
        let ExpiryDate = null
        if (expiryDate) {
            const expirydatetoString = expiryDate.toISOString();
            const year = expirydatetoString.slice(0, 4);
            const month = expirydatetoString.slice(5, 7);
            const day = expirydatetoString.slice(8, 10);
            ExpiryDate = `${day}/${month}/${year}`

        }
        let EffectiveDate = null
        if (effectiveDate) {
            const effectivedatetoString = effectiveDate.toISOString();
            const year = effectivedatetoString.slice(0, 4);
            const month = effectivedatetoString.slice(5, 7);
            const day = effectivedatetoString.slice(8, 10);
            EffectiveDate = `${day}/${month}/${year}`
        }

        return {
            id: _id,
            "Policy Name": name,
            "Description": description,
            "Category": category,
            "Currency": currency,
            "Limit Amount": limitAmount,
            "Effective Date": EffectiveDate,
            "Expiry Date": ExpiryDate,
            "Created Date": CreatedAt,
        }

    })
    return { status: 200, error: true, message: "Policy Data Fetched Successfully", data: FilteredPolicyData }
}

export const addpolicy = async (req: Request) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    const policypayload = await req.json();
    const { name, description, limitAmount, effectiveDate, expiryDate, category } = policypayload;

    if (!name || !description || !limitAmount || !effectiveDate || !expiryDate || !category) {
        return { status: 400, message: "Please fill in all the required fields", error: "true" }
    }

    const now = new Date();
    const dateOnly = now.toISOString().slice(0, 10);
    const year = dateOnly.slice(0, 4);
    const month = dateOnly.slice(5, 7);
    const day = dateOnly.slice(8, 11);
    // const today = `${month}-${day}-${year}`
    const today = new Date();

    const policiesByCategory = await policy.find({ category: category, effectiveDate: { $lte: today }, expiryDate: { $gte: today } });
    if (policiesByCategory.length > 0) {
        return { status: 409, message: "Active policy detected for this category. Creating another policy is not allowed. Please modify or remove the existing one.", error: true }
    }


    const PolicyData = await policy.find({ name: name });
    if (PolicyData.length > 0) {
        return { status: 409, message: "Policy Already Exist With This Name", error: "true" }
    }

    const newpolicy = await new policy({
        name,
        description,
        limitAmount,
        effectiveDate,
        category,
        expiryDate
    })
    await newpolicy.save();
    return { status: 200, message: "Policy Created Successfully", error: true, data: newpolicy }
}

export const getSpecificPolicy = async (req: Request, policyid: string) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    if (!policyid) {
        return { error: true, status: 400, message: "Policy ID is Required." }
    }
    const PolicyData = await policy.findOne({ _id: policyid });
    if (!PolicyData) {
        return { error: true, status: 404, message: "Policy Data Not Found" }
    }
    return { error: false, status: 200, data: PolicyData, message: "Policy Data Fetched Successfully" }
}

export const deletePolicy = async (req: Request, policyid: string) => {
    const payload = req.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    if (!policyid) {
        return { error: true, status: 400, message: "Policy ID is Required." }
    }
    const deletedPolicy = await policy.findByIdAndDelete(policyid);
    if (!deletePolicy) {
        return { error: true, status: 404, message: "Policy not found or already deleted." }
    }
    return { error: false, message: "Policy Deleted Successfully", data: deletedPolicy, status: 200 }
}

export const updatePolicy = async (request: Request, policyid: string) => {
    const payload = request.headers.get("userpayload");
    if (!payload) {
        return { error: true, status: 401, message: 'No User Payload found in Header' }
    }
    const { id } = JSON.parse(payload)
    const UserDetails = await User.findById(id);
    const role = UserDetails.Role
    if (role != 'Admin') {
        return { error: false, status: 401, message: 'Access Denied' }
    }
    if (!policyid) {
        return { error: true, status: 400, message: "Policy ID is Required." }
    }
    const policypayload = await request.json();
    const updatedPolicyData = await policy.findByIdAndUpdate(policyid, policypayload, { new: true })

    if (!updatedPolicyData) {
        return { error: true, message: "Failed to update policy.", status: 500 }
    }

    return { error: false, message: "Policy Updated Successfully", data: updatedPolicyData, status: 200 }
}

export const ValidatePolicy = async (request: Request) => {
    const policypayload = await request.json();

    const { name, description, limitAmount, category } = policypayload

    if (!name || !description || !limitAmount || !category) {
        return { status: 400, message: "Please fill in all the required fields", error: "true" }
    }
    let today = new Date();

    const policiesByCategory = await policy.findOne({ category: category });

    if (!policiesByCategory) {
        return { status: 400, message: "No active policy exists for the selected category", error: true }
    }

    if (!(policiesByCategory.effectiveDate <= today && today <= policiesByCategory.expiryDate)) {
        return { status: 400, error: true, message: "Policy is inactive. Please contact the authorized person for activation."}
    }

    if (limitAmount > policiesByCategory.limitAmount) {
        return { status: 400, message: "Requested amount exceeds the allowed policy limit.", error: true }
    }


    return { error: false, status: 200, data: true, message: "Validation Successful" }

}