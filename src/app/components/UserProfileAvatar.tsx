import profileAvatarUrl from '../../assets/avatars/corgiburrito.png';

type Props = {
  className?: string;
};

/** Same asset and treatment as the header nav profile photo (@corgiburrito). */
export function UserProfileAvatar({ className }: Props) {
  return <img alt="" src={profileAvatarUrl} className={className} />;
}
