import { useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import HttpService from "../../services/HttpService";
import { getBase64Prefix } from "../../services/Utilities";
import moment from "moment";

function UserProfile() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState({
    content: "",
    fileName: "",
    fileExtension: "",
  });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleNewProfilePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture({
          content: reader.result.split(",")[1],
          fileName: file.name.split(".")[0],
          fileExtension: `.${file.name.split(".").pop()}`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    let updatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: moment(user.dateOfBirth).format("YYYY-MM-DD"),
    };

    if (newProfilePicture.content !== "") {
      updatedUser = {
        ...updatedUser,
        profilePicture: {
          content: newProfilePicture.content,
          fileName: newProfilePicture.fileName,
          fileExtension: newProfilePicture.fileExtension,
        },
      };
    }

    await HttpService.updateUserProfile(updatedUser);
    setIsEditing(false);
    fetchUser().catch();
  };

  const fetchUser = async () => {
    let response = await HttpService.getUserProfile();

    response.dateOfBirth = moment(response.dateOfBirth).format("YYYY-MM-DD");
    setUser(response);
  };

  useEffect(() => {
    fetchUser().catch();
  }, []);

  return (
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            <div className="p-8 rounded-2xl bg-white shadow-lg shadow-red-200 border-solid border-2 border-red-300">
              <h2 className="text-red-800 text-center text-2xl font-bold my-2">
                {t("Profile")}
              </h2>
              <div className="flex justify-center mb-4">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-40 h-40 bg-slate-500 flex justify-center items-center rounded-full overflow-hidden relative cursor-pointer">
                    {newProfilePicture.content !== "" ? (
                        <img
                            src={
                                getBase64Prefix(newProfilePicture.fileExtension) +
                                newProfilePicture.content
                            }
                            alt="Profil Fotoğrafı"
                            className="w-full h-full object-cover"
                        />
                    ) : user.profilePicture ? (
                        <img
                            src={
                                getBase64Prefix(user.profilePicture.fileExtension) +
                                user.profilePicture.content
                            }
                            alt="Profil Fotoğrafı"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="relative flex items-center justify-center w-full h-full">
                          <MdAddPhotoAlternate className="absolute text-white text-7xl text-center" />
                        </div>
                    )}
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleNewProfilePicture}
                        disabled={!isEditing}
                    />
                  </div>
                </label>
              </div>
              <form className="mt-8 space-y-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    {t("firstName")}
                  </label>
                  <div className="relative flex items-center">
                    <input
                        type="text"
                        required
                        className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center ${
                            isEditing
                                ? "outline-red-600"
                                : "bg-gray-200 cursor-not-allowed"
                        }`}
                        placeholder={t("firstName")}
                        value={user.firstName || ""}
                        onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                        }
                        disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    {t("lastName")}
                  </label>
                  <div className="relative flex items-center">
                    <input
                        type="text"
                        required
                        className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center ${
                            isEditing
                                ? "outline-red-600"
                                : "bg-gray-200 cursor-not-allowed"
                        }`}
                        placeholder={t("lastName")}
                        value={user.lastName || ""}
                        onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                        }
                        disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    {t("dateOfBirth")}
                  </label>
                  <div className="relative flex items-center">
                    <input
                        type="date"
                        required
                        className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center ${
                            isEditing
                                ? "outline-red-600"
                                : "bg-gray-200 cursor-not-allowed"
                        }`}
                        value={user.dateOfBirth || ""}
                        onChange={(event) =>
                            setUser({ ...user, dateOfBirth: event.target.value })
                        }
                        disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    {t("email")}
                  </label>
                  <div className="relative flex items-center">
                    <input
                        type="email"
                        required
                        className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center ${
                            isEditing
                                ? "outline-red-600"
                                : "bg-gray-200 cursor-not-allowed"
                        }`}
                        placeholder={t("email")}
                        value={user.email || ""}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                      type="button"
                      onClick={() => {
                        if (isEditing) {
                          handleSubmit().catch();
                        } else {
                          handleEditToggle();
                        }
                      }}
                      className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-700 hover:bg-red-800 cursor-pointer focus:outline-none"
                  >
                    {isEditing ? t("Update") : t("Edit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UserProfile;
