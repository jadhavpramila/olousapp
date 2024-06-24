<template>
    <div class="bg-[#f2f2f2] p-[3rem] rounded-3xl flex justify-center">
        <div class="flex flex-col">
            
            <div>
                <h1 class="font-size-2 text-black font-medium text-center">Enquiry Form</h1>
            </div>
            <div class="grid grid-cols-1">
                <label for="Description" class="form-label  text-[#8d8d8d]">Please share details of your enquiry and  our team will be in touch.</label>
                <textarea id="txtdescription" class="form-control" cols="3" rows="4"></textarea>
            </div>
            <div class="grid grid-cols-1">
                <label for="name" class="form-label  text-[#8d8d8d]">Name</label>
                <input type="text" id="txtname" class="form-control">
            </div>
            <div>
                <!-- <label for="mobilenumber" class="text-black text-sm font-medium">Mobile No.</label> -->
                <div class="grid grid-cols-6 gap-4">
                    <div>
                        <label for="contrycode" class="form-label  text-[#8d8d8d]">Country Code</label>
                        <input type="text" class="form-control" id="txtCountryCode">
                    </div>
                    <div class="col-span-5">
                        <label for="ContactNumber" class="form-label  text-[#8d8d8d]">Number</label>
                        <input type="text" class="form-control" id="txtNumber">
                    </div>

                </div>
            </div>
            <div class="grid grid-cols-1">
                <label for="email" class="form-label text-[#8d8d8d]">Email</label>
                <input type="email" id="txtemail" class="form-control">
            </div>
            <div class="flex justify-end mt-5">
                <button class="btn bg-[#333] w-24 text-white">Submit</button>
            </div>

        </div>
    </div>
</template>