import React, { useState } from 'react';
import { Building, MapPin, Phone, Mail, Settings, UploadCloud, User, ArrowLeft, Info, ChevronDown, X, Map, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
const FormSection = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <div className=" p-2 mr-3">
        {React.cloneElement(icon, { className: "h-10 w-10 text-gray-600" })}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);
const InputField = ({ label, placeholder, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);
const SelectField = ({ label, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-[#2563EB] sm:text-sm"
      >
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);
const TagsInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="w-full flex flex-wrap items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                {tags.map(tag => (
                    <span key={tag} className="flex items-center bg-[#2563EB] text-white text-sm font-medium mr-2 mb-1 mt-1 px-2.5 py-0.5 rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1.5 focus:outline-none">
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type and press Enter to add tags"
                    className="flex-grow bg-transparent focus:outline-none sm:text-sm placeholder-gray-400"
                />
            </div>
        </div>
    );
};
const FileUploadArea = ({ title, subtitle, details }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{title}</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                    <p className="pl-1">Drop {subtitle} here or <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">browse</button></p>
                </div>
                <p className="text-xs text-gray-500">{details}</p>
            </div>
        </div>
    </div>
);
export default function AdminStoreAdd() {
  const [formState, setFormState] = useState({
    storeName: '',
    description: '',
    category: 'electronics',
    tags: ['electronics', 'gadgets'],
    storePhone: '+1 (555) 123-4567',
    storeEmail: 'store@example.com',
    customerSupport: '+1 (555) 987-6543',
    streetAddress: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'US',
    zip: '10001',
    storeStatus: true,
    storeType: '',
    businessType: '',
    ownerName: 'John Doe',
    ownerPhone: '+1 (555) 123-4567',
    ownerEmail: 'john@example.com'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTagsChange = (newTags) => {
    setFormState(prevState => ({ ...prevState, tags: newTags }));
  }
  
  const handleToggle = () => {
    setFormState(prevState => ({ ...prevState, storeStatus: !prevState.storeStatus }));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to={"/admin/store"} className="p-2 rounded-full hover:bg-gray-200 mr-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Add New Store</h1>
          </div>
          <p className="text-sm text-gray-500"><span className='text-red-700'>*</span>Required fields</p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-8">
            <FormSection icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" fill="#DBEAFE"/>
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" stroke="#E5E7EB"/>
<path d="M29 32H11V8H29V32Z"/>
<g clip-path="url(#clip0_104_305)">
<path d="M28.1124 14.2438L26.3218 11.4094C26.1624 11.1562 25.8781 11 25.5749 11H14.4249C14.1218 11 13.8374 11.1562 13.6781 11.4094L11.8843 14.2438C10.9593 15.7063 11.7781 17.7406 13.5062 17.975C13.6312 17.9906 13.7593 18 13.8843 18C14.6999 18 15.4249 17.6438 15.9218 17.0938C16.4187 17.6438 17.1437 18 17.9593 18C18.7749 18 19.4999 17.6438 19.9968 17.0938C20.4937 17.6438 21.2187 18 22.0343 18C22.8531 18 23.5749 17.6438 24.0718 17.0938C24.5718 17.6438 25.2937 18 26.1093 18C26.2374 18 26.3624 17.9906 26.4874 17.975C28.2218 17.7437 29.0437 15.7094 28.1156 14.2438H28.1124ZM26.6156 18.9656H26.6124C26.4468 18.9875 26.2781 19 26.1062 19C25.7187 19 25.3468 18.9406 24.9999 18.8344V23H14.9999V18.8313C14.6499 18.9406 14.2749 19 13.8874 19C13.7156 19 13.5437 18.9875 13.3781 18.9656H13.3749C13.2468 18.9469 13.1218 18.925 12.9999 18.8938V23V25C12.9999 26.1031 13.8968 27 14.9999 27H24.9999C26.1031 27 26.9999 26.1031 26.9999 25V23V18.8938C26.8749 18.925 26.7499 18.95 26.6156 18.9656Z" fill="#2563EB"/>
</g>
<defs>
<clipPath id="clip0_104_305">
<path d="M11 11H29V27H11V11Z" fill="white"/>
</clipPath>
</defs>
</svg>
} title="Store Information">
              <InputField label="Store Name" placeholder="Enter store name" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Describe your store..." 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[indigo-500] focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <SelectField label="Category" options={[{value: 'electronics', label: 'Electronics'}, {value: 'fashion', label: 'Fashion'}]} />
              <TagsInput tags={formState.tags} setTags={handleTagsChange} />
            </FormSection>

            <FormSection icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" fill="#DCFCE7"/>
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" stroke="#E5E7EB"/>
<path d="M28 32H12V8H28V32Z"/>
<g clip-path="url(#clip0_104_312)">
<path d="M17.1531 11.769C16.9125 11.1877 16.2781 10.8783 15.6719 11.044L12.9219 11.794C12.3781 11.944 12 12.4377 12 13.0002C12 20.7315 18.2688 27.0002 26 27.0002C26.5625 27.0002 27.0563 26.6221 27.2063 26.0783L27.9563 23.3283C28.1219 22.7221 27.8125 22.0877 27.2312 21.8471L24.2312 20.5971C23.7219 20.3846 23.1313 20.5315 22.7844 20.9596L21.5219 22.5002C19.3219 21.4596 17.5406 19.6783 16.5 17.4783L18.0406 16.219C18.4688 15.869 18.6156 15.2815 18.4031 14.7721L17.1531 11.7721V11.769Z" fill="#16A34A"/>
</g>
<defs>
<clipPath id="clip0_104_312">
<path d="M12 11H28V27H12V11Z" fill="white"/>
</clipPath>
</defs>
</svg>
} title="Contact Details">
              <InputField label="Store Phone" placeholder="+1 (555) 123-4567" value={formState.storePhone} />
              <InputField label="Store Email" placeholder="store@example.com" type="email" value={formState.storeEmail} />
              <InputField label="Customer Support" placeholder="+1 (555) 987-6543" value={formState.customerSupport} />
            </FormSection>

            <FormSection icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" fill="#F3E8FF"/>
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" stroke="#E5E7EB"/>
<path d="M29 32H11V8H29V32Z"/>
<path d="M29 27H11V11H29V27Z" stroke="#E5E7EB"/>
<path d="M16 12C14.8969 12 14 12.8969 14 14V21C14 22.1031 14.8969 23 16 23H27C28.1031 23 29 22.1031 29 21V14C29 12.8969 28.1031 12 27 12H16ZM23.375 15.3344L26.375 19.8344C26.5281 20.0656 26.5438 20.3594 26.4125 20.6031C26.2813 20.8469 26.0281 21 25.75 21H21.25H19.75H17.25C16.9625 21 16.7 20.8344 16.575 20.575C16.45 20.3156 16.4844 20.0062 16.6656 19.7812L18.6656 17.2812C18.8094 17.1031 19.0219 17 19.25 17C19.4781 17 19.6938 17.1031 19.8344 17.2812L20.375 17.9563L22.125 15.3313C22.2656 15.125 22.5 15 22.75 15C23 15 23.2344 15.125 23.375 15.3344ZM17 15C17 14.7348 17.1054 14.4804 17.2929 14.2929C17.4804 14.1054 17.7348 14 18 14C18.2652 14 18.5196 14.1054 18.7071 14.2929C18.8946 14.4804 19 14.7348 19 15C19 15.2652 18.8946 15.5196 18.7071 15.7071C18.5196 15.8946 18.2652 16 18 16C17.7348 16 17.4804 15.8946 17.2929 15.7071C17.1054 15.5196 17 15.2652 17 15ZM12.5 14.75C12.5 14.3344 12.1656 14 11.75 14C11.3344 14 11 14.3344 11 14.75V21.75C11 24.0969 12.9031 26 15.25 26H25.25C25.6656 26 26 25.6656 26 25.25C26 24.8344 25.6656 24.5 25.25 24.5H15.25C13.7313 24.5 12.5 23.2687 12.5 21.75V14.75Z" fill="#9333EA"/>
</svg>
} title="Media Uploads">
              <FileUploadArea title="Store Logo" subtitle="logo here" details="PNG, JPG up to 2MB" />
              <FileUploadArea title="Cover Image / Banner" subtitle="banner here" details="PNG, JPG up to 5MB" />
              <FileUploadArea title="Additional Gallery" subtitle="images here" details="Max 5 files" />
            </FormSection>
          </div>
          
          <div className="space-y-8">
            <FormSection icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" fill="#FFEDD5"/>
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" stroke="#E5E7EB"/>
<path d="M26 32H14V8H26V32Z"/>
<g clip-path="url(#clip0_104_324)">
<path d="M20.7406 26.6C22.3437 24.5938 26 19.7313 26 17C26 13.6875 23.3125 11 20 11C16.6875 11 14 13.6875 14 17C14 19.7313 17.6563 24.5938 19.2594 26.6C19.6438 27.0781 20.3562 27.0781 20.7406 26.6ZM20 15C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17C22 17.5304 21.7893 18.0391 21.4142 18.4142C21.0391 18.7893 20.5304 19 20 19C19.4696 19 18.9609 18.7893 18.5858 18.4142C18.2107 18.0391 18 17.5304 18 17C18 16.4696 18.2107 15.9609 18.5858 15.5858C18.9609 15.2107 19.4696 15 20 15Z" fill="#EA580C"/>
</g>
<defs>
<clipPath id="clip0_104_324">
<path d="M14 11H26V27H14V11Z" fill="white"/>
</clipPath>
</defs>
</svg>
} title="Address Details">
              <InputField label="Street Address" placeholder="123 Main Street" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="City" placeholder="New York" />
                <InputField label="State" placeholder="NY" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label="Country" options={[{value: 'US', label: 'United States'}, {value: 'CA', label: 'Canada'}]} />
                <InputField label="ZIP / Pincode" placeholder="10001" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location on Map</label>
                <div className="mt-1 flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-md text-center text-gray-500">
                    <Map className="h-10 w-10 mb-2"/>
                    <span className="text-sm">Click to set location</span>
                </div>
              </div>
            </FormSection>

            <FormSection icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" fill="#E0E7FF"/>
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" stroke="#E5E7EB"/>
<path d="M28 32H12V8H28V32Z"/>
<g clip-path="url(#clip0_104_331)">
<path d="M27.4969 16.2063C27.5969 16.4781 27.5126 16.7812 27.2969 16.975L25.9438 18.2063C25.9782 18.4656 25.9969 18.7312 25.9969 19C25.9969 19.2688 25.9782 19.5344 25.9438 19.7937L27.2969 21.025C27.5126 21.2187 27.5969 21.5219 27.4969 21.7937C27.3594 22.1656 27.1938 22.5219 27.0032 22.8656L26.8563 23.1187C26.6501 23.4625 26.4188 23.7875 26.1657 24.0938C25.9813 24.3187 25.6751 24.3937 25.4001 24.3062L23.6594 23.7531C23.2407 24.075 22.7782 24.3438 22.2844 24.5469L21.8938 26.3313C21.8313 26.6156 21.6126 26.8406 21.3251 26.8875C20.8938 26.9594 20.4501 26.9969 19.9969 26.9969C19.5438 26.9969 19.1001 26.9594 18.6688 26.8875C18.3813 26.8406 18.1626 26.6156 18.1001 26.3313L17.7094 24.5469C17.2157 24.3438 16.7532 24.075 16.3344 23.7531L14.5969 24.3094C14.3219 24.3969 14.0157 24.3188 13.8313 24.0969C13.5782 23.7906 13.3469 23.4656 13.1407 23.1219L12.9938 22.8687C12.8032 22.525 12.6376 22.1687 12.5001 21.7969C12.4001 21.525 12.4844 21.2219 12.7001 21.0281L14.0532 19.7969C14.0188 19.5344 14.0001 19.2688 14.0001 19C14.0001 18.7312 14.0188 18.4656 14.0532 18.2063L12.7001 16.975C12.4844 16.7812 12.4001 16.4781 12.5001 16.2063C12.6376 15.8344 12.8032 15.4781 12.9938 15.1344L13.1407 14.8812C13.3469 14.5375 13.5782 14.2125 13.8313 13.9062C14.0157 13.6813 14.3219 13.6062 14.5969 13.6937L16.3376 14.2469C16.7563 13.925 17.2188 13.6562 17.7126 13.4531L18.1032 11.6687C18.1657 11.3844 18.3844 11.1594 18.6719 11.1125C19.1032 11.0375 19.5469 11 20.0001 11C20.4532 11 20.8969 11.0375 21.3282 11.1094C21.6157 11.1562 21.8344 11.3812 21.8969 11.6656L22.2876 13.45C22.7813 13.6531 23.2438 13.9219 23.6626 14.2438L25.4032 13.6906C25.6782 13.6031 25.9844 13.6813 26.1688 13.9031C26.4219 14.2094 26.6532 14.5344 26.8594 14.8781L27.0063 15.1312C27.1969 15.475 27.3626 15.8313 27.5001 16.2031L27.4969 16.2063ZM20.0001 21.5C20.6631 21.5 21.299 21.2366 21.7678 20.7678C22.2367 20.2989 22.5001 19.663 22.5001 19C22.5001 18.337 22.2367 17.7011 21.7678 17.2322C21.299 16.7634 20.6631 16.5 20.0001 16.5C19.337 16.5 18.7011 16.7634 18.2323 17.2322C17.7634 17.7011 17.5001 18.337 17.5001 19C17.5001 19.663 17.7634 20.2989 18.2323 20.7678C18.7011 21.2366 19.337 21.5 20.0001 21.5Z" fill="#4F46E5"/>
</g>
<defs>
<clipPath id="clip0_104_331">
<path d="M12 11H28V27H12V11Z" fill="white"/>
</clipPath>
</defs>
</svg>
} title="Store Settings">
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Store Status</label>
                    <button onClick={handleToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formState.storeStatus ? 'bg-[#2563EB]' : 'bg-gray-200'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formState.storeStatus ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <SelectField label="Store Type" options={[{value: '', label: 'Select type'}]} />
                <SelectField label="Business Type" options={[{value: '', label: 'Select business type'}]} />
            </FormSection>

            <FormSection icon={<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" fill="#CCFBF1"/>
<path d="M32 0C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 6.44277e-08 36.4183 0 32V8C0 3.58172 3.58172 6.44256e-08 8 0H32Z" stroke="#E5E7EB"/>
<path d="M27 32H13V8H27V32Z"/>
<g clip-path="url(#clip0_104_337)">
<path d="M20 19C21.0609 19 22.0783 18.5786 22.8284 17.8284C23.5786 17.0783 24 16.0609 24 15C24 13.9391 23.5786 12.9217 22.8284 12.1716C22.0783 11.4214 21.0609 11 20 11C18.9391 11 17.9217 11.4214 17.1716 12.1716C16.4214 12.9217 16 13.9391 16 15C16 16.0609 16.4214 17.0783 17.1716 17.8284C17.9217 18.5786 18.9391 19 20 19ZM18.5719 20.5C15.4938 20.5 13 22.9937 13 26.0719C13 26.5844 13.4156 27 13.9281 27H26.0719C26.5844 27 27 26.5844 27 26.0719C27 22.9937 24.5063 20.5 21.4281 20.5H18.5719Z" fill="#0D9488"/>
</g>
<defs>
<clipPath id="clip0_104_337">
<path d="M13 11H27V27H13V11Z" fill="white"/>
</clipPath>
</defs>
</svg>
} title="Store Owner Details">
              <InputField label="Owner Full Name" placeholder="John Doe" />
              <InputField label="Phone Number" placeholder="+1 (555) 123-4567" />
              <InputField label="Email" placeholder="john@example.com" type="email"/>
              <FileUploadArea title="KYC / GST / Documents" subtitle="documents here" details="PDF, PNG, JPG up to 10MB" />
            </FormSection>
          </div>
        </main>
        <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center text-sm text-gray-600 mb-4 sm:mb-0">
                <Info className="h-4 w-4 mr-2" />
                <span>All changes are automatically saved as a draft.</span>
            </div>
            <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save as Draft</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Store</button>
            </div>
        </footer>

      </div>
    </div>
  );
}
