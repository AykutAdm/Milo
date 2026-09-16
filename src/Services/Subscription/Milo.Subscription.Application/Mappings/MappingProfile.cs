using AutoMapper;
using Milo.Subscription.Application.Features.AccountInfos.Commands;
using Milo.Subscription.Application.Features.AccountInfos.Results;
using Milo.Subscription.Application.Features.Categories.Commands;
using Milo.Subscription.Application.Features.Categories.Results;
using Milo.Subscription.Application.Features.Platforms.Commands;
using Milo.Subscription.Application.Features.Platforms.Results;
using Milo.Subscription.Application.Features.UserSubscriptions.Commands;
using Milo.Subscription.Application.Features.UserSubscriptions.Results;
using Milo.Subscription.Domain.Entities;

namespace Milo.Subscription.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Category
            CreateMap<CreateCategoryCommand, Category>();
            CreateMap<UpdateCategoryCommand, Category>();

            CreateMap<GetCategoryQueryResult, Category>().ReverseMap();
            CreateMap<GetCategoryByIdQueryResult, Category>().ReverseMap();



            //Platform
            CreateMap<CreatePlatformCommand, Platform>();
            CreateMap<UpdatePlatformCommand, Platform>();

            CreateMap<Platform, GetPlatformQueryResult>()
                 .ForMember(dest => dest.CategoryName,
                    opt => opt.MapFrom(src => src.Category.CategoryName));

            CreateMap<Platform, GetPlatformByIdQueryResult>()
                 .ForMember(dest => dest.CategoryName,
                    opt => opt.MapFrom(src => src.Category.CategoryName));



            //AccountInfo
            CreateMap<CreateAccountInfoCommand, AccountInfo>();
            CreateMap<UpdateAccountInfoCommand, AccountInfo>();

            CreateMap<AccountInfo, GetAccountInfoQueryResult>()
                 .ForMember(dest => dest.PlatformName,
                    opt => opt.MapFrom(src => src.Platform.PlatformName));

            CreateMap<AccountInfo, GetAccountInfoByIdQueryResult>()
                 .ForMember(dest => dest.PlatformName,
                    opt => opt.MapFrom(src => src.Platform.PlatformName));


            //UserSubscription
            CreateMap<CreateUserSubscriptionCommand, UserSubscription>();
            CreateMap<UpdateUserSubscriptionCommand, UserSubscription>();


            CreateMap<UserSubscription, GetUserSubscriptionQueryResult>()
                 .ForMember(dest => dest.PlatformName, opt => opt.MapFrom(src => src.Platform.PlatformName))
                 .ForMember(dest => dest.PlatformIconUrl, opt => opt.MapFrom(src => src.Platform.PlatformIconUrl))
                 .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Platform.Category.CategoryName));


            CreateMap<UserSubscription, GetUserSubscriptionByIdQueryResult>()
               .ForMember(dest => dest.PlatformName,
                          opt => opt.MapFrom(src => src.Platform.PlatformName))
               .ForMember(dest => dest.PlatformIconUrl,
                          opt => opt.MapFrom(src => src.Platform.PlatformIconUrl))
               .ForMember(dest => dest.CategoryName,
                          opt => opt.MapFrom(src => src.Platform.Category.CategoryName));


        }
    }
}
